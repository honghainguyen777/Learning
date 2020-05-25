from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from decimal import Decimal

# Create your models here.
SIZE = (
    ('Small', 'Small'),
    ('Large', 'Large'),
)

class Pizza(models.Model):
    NAME = (
        ('Regular', 'Regular'),
        ('Sicilian', 'Sicilian'),
        ('Special Regular', 'Special Regular'),
        ('Special Sicilian', 'Special Sicilian')
    )
    name = models.CharField(max_length=30, choices=NAME)
    size = models.CharField(max_length=5, choices=SIZE)
    base_price = models.DecimalField(decimal_places=2, max_digits=5)

    def __str__(self):
        return f"Cheese {self.name} pizza ({self.size})"


class Topping(models.Model):
    name = models.CharField(max_length=64)
    def __str__(self):
        return self.name

class ExtraSub(models.Model):
    name = models.CharField(max_length=64)
    def __str__(self):
        return f"{self.name}"


class Sub(models.Model):
    name = models.CharField(max_length=64, null=False, blank=False)
    size = models.CharField(max_length=5, choices=SIZE)
    base_price = models.DecimalField(decimal_places=2, max_digits=5)
    def __str__(self):
        return f"{self.name} ({self.size})"


class Pasta(models.Model):
    name = models.CharField(max_length=64, null=False, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    def __str__(self):
        return self.name

class Salad(models.Model):
    name = models.CharField(max_length=64, null=False, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    def __str__(self):
        return self.name

class DinnerPlatter(models.Model):
    name = models.CharField(max_length=64, null=False, blank=False)
    size = models.CharField(max_length=5, choices=SIZE)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    def __str__(self):
        return f"{self.name} ({self.size})"

status = (
    ('pending', 'pending'),
    ('completed', 'completed'),
)
class PizzaOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="PizzaUser")
    pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE, related_name="pizzas")
    toppings = models.ManyToManyField(Topping, blank=True, related_name="toppings")
    status = models.CharField(max_length=30, choices=status, default='pending')

class SubsOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="SubUser")
    sub = models.ForeignKey(Sub, on_delete=models.CASCADE, related_name="subs")
    extrasubs = models.ManyToManyField(ExtraSub, blank=True, related_name="extrasubs")

class OtherOrders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="OrderUser")
    pasta = models.ForeignKey(Pasta, on_delete=models.CASCADE, null=True, blank=True, related_name="pasta")
    salad = models.ForeignKey(Salad, on_delete=models.CASCADE, null=True, blank=True, related_name="salad")
    dinnerplatter = models.ForeignKey(DinnerPlatter, on_delete=models.CASCADE, null=True, blank=True, related_name="dinnerplatter")
