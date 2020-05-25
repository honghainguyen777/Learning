from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from decimal import Decimal
import datetime
from django.utils import timezone

# Create your models here.
CATEGORIES = (
    ('Regular Pizzas', 'Regular Pizzas'),
    ('Sicilian Pizzas', 'Sicilian Pizzas'),
    ('Subs', 'Subs'),
    ('Pastas', 'Pastas'),
    ('Salads', 'Salads'),
    ('Dinner Platters', 'Dinner Platters')
)

SIZES = (
    ('Small', 'Small'),
    ('Large', 'Large')
)

STATUS = (
    ('Pending', 'Pending'),
    ('Completed', 'Completed')
)


class Product(models.Model):
    name = models.CharField(max_length=64)
    category = models.CharField(max_length=32, choices=CATEGORIES)
    num_toppings = models.IntegerField(default=0)
    price_small = models.DecimalField(decimal_places=2, max_digits=5)
    price_large = models.DecimalField(decimal_places=2, max_digits=5)
    def __str__(self):
        return f"{self.name} ({self.category})"

class Topping(models.Model):
    name = models.CharField(max_length=64)
    def __str__(self):
        return self.name

class ExtraSub(models.Model):
    name = models.CharField(max_length=64)
    price_small = models.DecimalField(decimal_places=2, max_digits=5)
    price_large = models.DecimalField(decimal_places=2, max_digits=5)
    def __str__(self):
        return self.name

class Order_template(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product")
    toppings = models.ManyToManyField(Topping, blank=True, related_name="toppings")
    extra_subs = models.ManyToManyField(ExtraSub, blank=True)
    #size = models.CharField(max_length=1, choices=SIZES)
    price = models.DecimalField(decimal_places=2, max_digits=5)

    def __str__(self):
        return f"{self.product.name} - {self.price}$"

class Order_detail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usernames")
    # change order_all -> all_products
    # let blank=True to allow to init the object
    all_products = models.ManyToManyField(Order_template, blank=True, related_name="user_orders")
    status = models.CharField(max_length=32, choices=STATUS, default='Pending')
    total_price = models.DecimalField(decimal_places=2, max_digits=7)

    def __str__(self):
        return f"Order No.{self.id}: {self.total_price}$ ({self.status})"
