from django.contrib import admin
from .models import Product, Topping, ExtraSub, Order_template, Order_detail

# Register your models here.
admin.site.register(Product)
admin.site.register(Topping)
admin.site.register(ExtraSub)
admin.site.register(Order_template)
admin.site.register(Order_detail)
