from django.urls import path

from drf_app.product.views import ProductsApiViews

urlpatterns = (
    path(
        "products/",
        ProductsApiViews.as_view(),
        name="product_list_products",
    ),
)
