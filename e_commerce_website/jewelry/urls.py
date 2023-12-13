from django.urls import include, path

from e_commerce_website.jewelry.views import show_jewelries

urlpatterns = (
    path("<int:category_pk>", show_jewelries, name="show_jewelries"),
)
