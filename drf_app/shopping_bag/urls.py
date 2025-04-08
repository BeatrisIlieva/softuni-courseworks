from django.urls import path

from drf_app.shopping_bag.views import ShoppingBagApiView


urlpatterns = (path("", ShoppingBagApiView.as_view(), name="api_shopping_bags"),)
