from django.urls import path

from e_commerce_website.shopping_cart.views import ShoppingCartView, AddToShoppingCartView

urlpatterns = (
    path('add_to_shopping_cart/<int:jewelry_pk>/', AddToShoppingCartView.as_view(), name='add_to_shopping_cart'),
    path('view_shopping_cart/<int:pk>/', ShoppingCartView.as_view(), name='view_shopping_cart'),

)
