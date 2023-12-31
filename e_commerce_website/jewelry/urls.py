from django.urls import path

from e_commerce_website.jewelry.views import DisplayJewelriesView, JewelryDetailsView

urlpatterns = (
    path("categories/<int:category_pk>/", DisplayJewelriesView.as_view(), name="display_jewelries_by_category"),
    path("metals/<int:metal_pk>/", DisplayJewelriesView.as_view(), name="display_jewelries_by_metal"),
    path("gemstones-types/<int:stone_type_pk>/", DisplayJewelriesView.as_view(), name="display_jewelries_by_stone_type"),
    path("gemstones-colors/<int:stone_color_pk>/", DisplayJewelriesView.as_view(), name="display_jewelries_by_stone_color"),
    path("jewelry/<int:pk>/", JewelryDetailsView.as_view(), name='display_jewelry_details')
)
