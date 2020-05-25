from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register_view, name="register"),
    path("cart", views.cart_view, name="cart"),
    path("checkout", views.checkout_view, name="checkout"),
    path("history", views.history_view, name="history"),
    path("manage", views.manage_view, name="manage")
]
