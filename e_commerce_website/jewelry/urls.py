from django.urls import include, path

from e_commerce_website.jewelry.views import show_jewelries, show_jewelry_details

urlpatterns = (
    path("<int:customer_gender_pk>/<int:category_pk>/", show_jewelries, name="show_jewelries"),
    path("<int:jewelry_pk>/", show_jewelry_details, name='show_jewelry_details')
)
