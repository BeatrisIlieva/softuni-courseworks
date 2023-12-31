from django.urls import path

from e_commerce_website.jewelry.views import DisplayJewelriesView, JewelryDetailsView

urlpatterns = (
    path("categories/<int:category_id>/", DisplayJewelriesView.as_view(), name="display_jewelries_by_category"),
    path("metals/<int:metal_id>/", DisplayJewelriesView.as_view(), name="display_jewelries_by_metal"),
    path("jewelries/<int:pk>/", JewelryDetailsView.as_view(), name='show_jewelry_details')
)
