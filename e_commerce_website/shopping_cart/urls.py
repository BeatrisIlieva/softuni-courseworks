from django.urls import path

from e_commerce_website.shopping_cart.views import ShoppingCartView, add_to_shopping_cart

urlpatterns = (
    path('add_to_shopping_cart/<int:jewelry_pk>/', add_to_shopping_cart, name='add_to_shopping_cart'),
    path('view_shopping_cart/', ShoppingCartView.as_view(), name='view_shopping_cart'),
)