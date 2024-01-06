from django.urls import path

from e_commerce_website.jewelry.views import JewelryDetailsView, DisplayJewelriesByCategoryView, \
    DisplayJewelriesByMetalView, DisplayJewelriesByStoneTypeView, DisplayJewelriesByStoneColorView, view_jewelry

urlpatterns = (
    path("categories/<int:choice_pk>/", DisplayJewelriesByCategoryView.as_view(), name="display_jewelries_by_category"),
    path("metals/<int:choice_pk>/", DisplayJewelriesByMetalView.as_view(), name="display_jewelries_by_metal"),
    path("gemstones-types/<int:choice_pk>/", DisplayJewelriesByStoneTypeView.as_view(),
         name="display_jewelries_by_stone_type"),
    path("gemstones-colors/<int:choice_pk>/", DisplayJewelriesByStoneColorView.as_view(),
         name="display_jewelries_by_stone_color"),
    path("jewelry/<int:pk>/", JewelryDetailsView.as_view(), name='display_jewelry_details'),
    path('jewelry-details/<int:pk>', view_jewelry, name='view_jewelry'),
)
