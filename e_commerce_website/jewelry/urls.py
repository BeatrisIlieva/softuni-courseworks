from django.urls import path

from e_commerce_website.jewelry.utils import view_jewelry, select_size
from e_commerce_website.jewelry.views import (
    JewelryDetailsView,
    DisplayJewelriesByCategoryView,
    DisplayJewelriesByMetalView,
    DisplayJewelriesByStoneTypeView,
    DisplayJewelriesByStoneColorView
)

urlpatterns = (
    path(
        "categories/<int:selected_pk>/",
        DisplayJewelriesByCategoryView.as_view(),
        name="display_jewelries_by_category"),
    path(
        "metals/<int:selected_pk>/",
        DisplayJewelriesByMetalView.as_view(),
        name="display_jewelries_by_metal"
    ),
    path(
        "gemstones-types/<int:selected_pk>/",
        DisplayJewelriesByStoneTypeView.as_view(),
        name="display_jewelries_by_stone_type"
    ),
    path(
        "gemstones-colors/<int:selected_pk>/",
        DisplayJewelriesByStoneColorView.as_view(),
        name="display_jewelries_by_stone_color"),
    path(
        "jewelry/<int:pk>/",
        JewelryDetailsView.as_view(),
        name='display_jewelry_details'
    ),
    path(
        'jewelry-details/<int:pk>',
        view_jewelry,
        name='view_jewelry'
    ),
    path(
        'jewelry-size/<int:pk>',
        select_size,
        name='select_size'
    ),
)
