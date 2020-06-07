from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("item/<int:item_id>", views.item_view, name="itemview"),
    path("category/item/<int:item_id>", views.item_view, name="itemview_cate"),
    path("category/<str:category>", views.category_view, name="category"),
    path("checkout", views.checkout_view, name="checkout"),
    path("history", views.history_view, name="history"),
    path("manageOrder", views.manageOrder_view, name="manageOrder"),
    path("manageProduct", views.manageProduct_view, name="manageProduct"),
    path("productEdit", views.productEdit_view, name="productEdit"),
    path("search", views.search_view, name="search"),
    path("login", views.login_view, name="login"),
    path("register", views.register_view, name="register"),
    path("logout", views.logout_view, name="logout")
]
