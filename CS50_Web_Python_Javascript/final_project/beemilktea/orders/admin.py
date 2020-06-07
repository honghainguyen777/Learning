from django.contrib import admin
from .models import Product, Ordered_item, Order

# Register your models here.
admin.site.register(Product)
admin.site.register(Ordered_item)
admin.site.register(Order)
