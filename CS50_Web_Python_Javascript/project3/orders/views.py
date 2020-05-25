from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import Product, Topping, ExtraSub, Order_template, Order_detail
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json
from django.contrib import messages

# Create your views here.


def list_detail_orders(orders):
    details = {}
    # from the newest order to oldest one
    for order in reversed(orders):
        details[order.id] = {
            "order_id": order.id,
            "status": order.status,
            "total_price": order.total_price,
            "ordered_products": []
            }
        for product in order.all_products.all():
                toppings = []
                extraSubs = []
                for topping in product.toppings.all():
                    toppings.append(topping.name)
                for extrasub in product.extra_subs.all():
                    extraSubs.append(extrasub.name)
                ordered_product = {
                "name": product.product.name,
                "category": product.product.category,
                #"size": product.size,
                "price": product.price,
                "toppings": ', '.join(toppings),
                "extra_subs": ', '.join(extraSubs)
                }
                details[order.id]["ordered_products"].append(ordered_product)
    return details

# Django template does not allow to use dict[key] to get the corresponding value


def index(request):
    if not request.user.is_authenticated:
        return render(request, "orders/login.html", {"message": None})

    context = {
        "user": request.user,
        "products" : {
            "Regular Pizzas": Product.objects.filter(category="Regular Pizzas"),
            "Sicilian Pizzas": Product.objects.filter(category="Sicilian Pizzas"),
            "Subs": Product.objects.filter(category="Subs"),
            "Pastas": Product.objects.filter(category="Pastas"),
            "Salads": Product.objects.filter(category="Salads"),
            "Dinner Platters": Product.objects.filter(category="Dinner Platters")
            # "user_orders": Order_detail.objects.filter(user=request.user),
        },
        "toppings": Topping.objects.all(),
        "extra_subs": ExtraSub.objects.all()
    }
    return render(request, 'orders/index.html', context)

def cart_view(request):
    if request.POST:
        return render(request, "orders/checkout.html", {"message": None})
    else:
        return render(request, "orders/cart.html", {"message": None})

def checkout_view(request):
    if request.POST:
        order_data = request.POST["data-cart"]
        # parse JSON data to object
        data = json.loads(order_data)
        # check if data is empty again before further processing
        if not data["items"]:
            return render(request, "orders/cart.html", {"message": "Sorry, something wrong! Try it again"})
        items = data["items"]
        total_price = data["total_price"]
        #initialize the order
        order = Order_detail.objects.create(user=request.user, total_price=total_price)
        #list_item_order =
        for item in items:
            # get Product-type data of the item
            category = item["category"]
            name = item["item_name"]
            print(category)
            print(name)
            product = Product.objects.get(category=item["category"], name=item["item_name"])
            price = item["price"]
            # user create to create an object with m2mfield --> auto saved
            order_item = Order_template.objects.create(product=product, price=price)
            # add each m2mfield by using add(), multiple values can be added into m2m field but not list --> use * --> add(obj1, obj2....)
            if item["toppings"]:
                toppings = [Topping.objects.get(name=Tname) for Tname in item["toppings"]]
                order_item.toppings.add(*toppings)
            if item["extrasubs"]:
                extrasubs = [ExtraSub.objects.get(name=Sname) for Sname in item["extrasubs"]]
                order_item.extra_subs.add(*extrasubs)
            # add the order_item into the order
            order.all_products.add(order_item)
            # find the way to remove order_item in Order_template without effecting the order table??

        orders_his = list_detail_orders(Order_detail.objects.filter(user=request.user))
        context = {
            "orders": orders_his,
            "message": "Thank you! We have received your order"
        }
        return render(request, 'orders/history.html', context)
    else:
        return HttpResponseRedirect(reverse("index"))

def manage_view(request):
    if request.user.is_superuser:
        if request.POST:
            order_id = request.POST["orderId"]
            current_status = request.POST["status"]
            print(current_status)
            if current_status == "Completed":
                Order_detail.objects.filter(pk=order_id).update(status=current_status)
        all_orders = list_detail_orders(Order_detail.objects.all())
        context = {
            "orders": all_orders,
        }
        return render(request, 'orders/management.html', context)
    else:
        return HttpResponseRedirect(reverse("index"))




def history_view(request):
    # could be both administrators and users
    # order detail includes: category,
    orders = list_detail_orders(Order_detail.objects.filter(user=request.user))
    context = {
        "orders": orders,
    }
    # "user_orders": list_detail_orders(Order_detail.objects.filter(user=request.user)).values()
    return render(request, 'orders/history.html', context)


# When user submit orders with a confirm button --> check credit card, Shipping address


# A route for sending an email about orders (ordered, started to ship)

# Login, Logout, Register route

def login_view(request):
    if request.POST:
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "orders/login.html", {"message": "Invalid credentials."})
    else:
        return render(request, "orders/login.html", {"message": None})


def logout_view(request):
  logout(request)
  return render(request, "orders/login.html", {"message": "Logged out."})

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
            return render(request, "orders/register.html", {"message": "Invalid inputs"})
        if password != confirmation:
            return render(request, "orders/register.html", {"message": "Passwords not match"})
        user_exist = User.objects.filter(username=username).exists()
        if not user_exist:
            user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)
            user.save()
            # display a messeage for successful registration
            # send message to user email
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "orders/register.html", {"message": "username has already been taken"})
    else:
        return render(request, "orders/register.html", {"message": None})
