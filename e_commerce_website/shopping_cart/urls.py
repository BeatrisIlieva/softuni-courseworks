from django.urls import path

from e_commerce_website.shopping_cart.views import (
    DisplayShoppingCartView,
    UpdateShoppingCartView,
    AddToShoppingCartView
)

urlpatterns = (
    path(
        'add_to_shopping_cart/<int:pk>/',
        AddToShoppingCartView.as_view(),
        name='add_to_shopping_cart'
    ),
    path(
        'update_shopping_cart/<int:pk>/',
        UpdateShoppingCartView.as_view(),
        name='update_shopping_cart'
    ),
    path(
        'view_shopping_cart/',
        DisplayShoppingCartView.as_view(),
        name='view_shopping_cart'
    ),

)
