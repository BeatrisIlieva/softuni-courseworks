from django.urls import path

from e_commerce_website.jewelry.views import DisplayJewelriesView, JewelryDetailsView

urlpatterns = (
    path("<int:category_id>/", DisplayJewelriesView.as_view(), name="show_jewelries"),
    path("jewelries/<int:pk>/", JewelryDetailsView.as_view(), name='show_jewelry_details')
)
