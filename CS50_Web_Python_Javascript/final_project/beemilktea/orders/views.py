from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Product, Ordered_item, Order
import ntpath
from django.core.exceptions import ObjectDoesNotExist
import json
from django.contrib import messages
from datetime import datetime


# list of categories
categories = ('MILK TEA', 'SODA', 'FRESH MILK', 'FRUIT TEA', 'JUNK FOOD', 'OTHER DRINK')

def list_detail_orders(orders):
    details = {}
    # from the newest order to oldest one
    for order in reversed(orders):
        details[order.id] = {
            "order_id": order.id,
            "status": order.status,
            "total_price": order.total_price,
            "ordered_products": [],
            "item_count": order.ordered_items.all().count(),
            "customer_name": order.name,
            "customer_mobile": order.mobile,
            "shipping_address": order.shipping_address,
            "customer_ordered_time": order.ordered_time,
            "customer_desires": order.expected_time_request,
            "delivery_time": order.delivery_time
            }
        for product in order.ordered_items.all():
                ordered_product = {
                "name": product.product.name,
                "price": product.price_quantity,
                "quantity": product.quantity,
                "user_request": product.notice,
                "basic_price": product.product.price,
                "unit": product.product.unit
                }
                details[order.id]["ordered_products"].append(ordered_product)
    return details


# Create your views here.
# get image filename when administrators upload image
def image_filename(image):
    path = image.url
    head, tail = ntpath.split(path)
    return tail

def get_product_by_category(data, category):
    list_items = []
    items = data.filter(category=category)
    for item in items:
        # development only - upload through admin
        item.image_filename = image_filename(item.image)
        list_items.append(item)
    return list_items

def index(request):
    if request.POST:
        return render(request, "orders/checkout.html", {"message": None})
    else:
        all_products = {}
        product_data = Product.objects.all()
        for category in categories:
            items = get_product_by_category(product_data, category)
            if len(items) != 0:
                all_products[category] = items
        context = {
            "data": all_products,
        }
        return render(request, "orders/index.html", context)

def item_view(request, item_id):
    try:
        data = Product.objects.get(pk=item_id)
    except ObjectDoesNotExist:
        return HttpResponseRedirect(reverse("index"))
    # development only
    data.image_filename = image_filename(data.image)
    JSONdata = {
        "id": item_id,
        "name": data.name,
        "category": data.category,
        "unit": data.unit,
        "price": float(data.price)
    }

    JSONdata = json.dumps(JSONdata)

    context = {
        "item": data,
        "JSONdata": JSONdata
    }
    return render(request, "orders/product.html", context)

def category_view(request, category):
    data = Product.objects.filter(category=category)
    items = get_product_by_category(data, category)
    # add a handler for empty case
    return render(request, "orders/index.html", {"data": {category: items}})

def search_view(request):
    if request.POST:
        query = request.POST["query"]
        items = Product.objects.filter(name__contains=query)
        list_items = []
        for item in items:
            # development only - upload through admin
            item.image_filename = image_filename(item.image)
            list_items.append(item)
        # In PostgeSQL using one of the below
        # this dealing with non-English names
        # Product.objects.filter(name__unaccent__icontains=query)
        # but name is long, the below does not work well
        # Product.objects.filter(name__unaccent__lower__trigram_similar=query)
        return render(request, "orders/index.html", {"data": {"Search results": list_items}})
    else:
        return HttpResponseRedirect(reverse(index))


def checkout_view(request):
    if request.POST:
        user = User.objects.get(username=request.user)
        order_data = request.POST["data-cart"]
        # parse JSON data to object
        data = json.loads(order_data)
        # check if data is empty again before further processing
        if not data["items"]:
            messages.info(request, "Sorry, something wrong! Try it again")
            return render(request, "orders/checkout.html")
        items = data["items"]
        total_price = data["total_price"]
        reciever = request.POST["name"]
        mobile = request.POST["mobile"]
        shipping_address = request.POST["address"] + ", " + request.POST["country"] + ", " + request.POST["zipcode"] + " " + request.POST["state"]
        email = user.email
        expected_time_request = request.POST["expected_time_request"]
        #initialize the order
        order = Order.objects.create(user=request.user, name=reciever, mobile=mobile, shipping_address=shipping_address, email=email, expected_time_request=expected_time_request, total_price=total_price)
        #list_item_order =
        for item in items:
            # get Product-type data of the item
            item_data = json.loads(item["item"])
            quantity = item["quantity"]
            id = item_data["id"]
            name_item = item_data["name"]
            product = Product.objects.get(name=name_item, pk=id)
            price_quantity = float(quantity) * float(product.price)
            notice = item["notice"]

            # user create to create an object with m2mfield --> auto saved
            order_item = Ordered_item.objects.create(product=product, quantity=quantity, price_quantity=price_quantity, notice=notice)

            # add the order_item into the order
            order.ordered_items.add(order_item)
            # find the way to remove order_item in Order_template without effecting the order table??

        orders_list = list_detail_orders(Order.objects.filter(user=request.user))
        context = {
            "orders": orders_list,
            "message": "Thank you! We have received your order"
        }
        return render(request, 'orders/history.html', context)
    else:
        return HttpResponseRedirect(reverse("index"))

def history_view(request):
    # could be both administrators and users
    # order detail includes: category,
    orders = list_detail_orders(Order.objects.filter(user=request.user))
    context = {
        "orders": orders,
    }
    # "user_orders": list_detail_orders(Order_detail.objects.filter(user=request.user)).values()
    return render(request, 'orders/history.html', context)

def manageOrder_view(request):
    if request.user.is_superuser:
        if request.POST:
            order_id = request.POST["orderId"]
            current_status = request.POST["status"]
            timedate_str = request.POST["date"] + " " + request.POST["time"]
            Order.objects.filter(pk=order_id).update(delivery_time=timedate_str)
            if current_status != "Pending":
                Order.objects.filter(pk=order_id).update(status=current_status)
        all_orders = list_detail_orders(Order.objects.all())
        context = {
            "orders": all_orders,
        }
        return render(request, 'orders/manageOrder.html', context)
    else:
        return HttpResponseRedirect(reverse("index"))

def manageProduct_view(request):
    if request.user.is_superuser:
        if request.POST:
            productName = request.POST["productName"]
            category = request.POST["category"]
            price_basic = request.POST["price_basic"]
            unit = request.POST["unit"]
            availablity = request.POST["availablity"]
            quantity = request.POST["quantity"]
            description_short = request.POST["description_short"]
            product_image = request.FILES.get("product_image")
            description_long = request.POST["description_long"]
            # This is for the case of product editting
            if request.POST["upload_type"] == "edit":
                product_id = request.POST["product_id"]
                Product.objects.filter(pk=int(product_id)).update(name=productName, category=category, price=price_basic, unit=unit, availability=availablity, quantity=quantity, description_short=description_short, description_long=description_long)
                if product_image != None:
                    product = Product.objects.get(pk=int(product_id))
                    product.image = product_image
                    product.save()
                messages.success(request, "Edited successfully")
            else:
                Product.objects.create(name=productName, category=category, price=price_basic, unit=unit, availability=availablity, quantity=quantity, description_short=description_short, description_long=description_long, image=product_image)
                messages.success(request, "Uploaded successfully")
        all_products = {}
        product_data = Product.objects.all()
        for category in categories:
            items = get_product_by_category(product_data, category)
            if len(items) != 0:
                all_products[category] = items
        context = {
            "data": all_products,
        }
        return render(request, "orders/manageProduct.html", context)
    else:
        return HttpResponseRedirect(reverse("index"))


def productEdit_view(request):
    if request.user.is_superuser:
        if request.POST:
            product_id = int(request.POST["product_id"])
            product = Product.objects.get(pk=product_id)
            return render(request, "orders/productEdit.html", {"product": product})
        else:
            return HttpResponseRedirect(reverse("manageProduct"))
    else:
        return HttpResponseRedirect(reverse("index"))


def login_view(request):
    if request.POST:
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        else:
            messages.error(request, "Invalid credentials")
    return HttpResponseRedirect(reverse("index"))

def register_view(request):
    if request.POST:
        # checking can be done in JavaScript
        username = request.POST["username"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        email = request.POST["email"]
        if not username or not password or not confirmation or not first_name or not last_name or not email:
            messages.info(request, "Invalid Inputs")
        if password != confirmation:
            messages.info(request, "Passwords Not Match")
        user_exist = User.objects.filter(username=username).exists()
        if not user_exist:
            user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)
            user.save()
            # display a messeage for successful registration
            # send message to user email
            login(request, user)
        elif user_exist:
            messages.info(request, "Username Already Exists")
    return HttpResponseRedirect(reverse("index"))


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))
