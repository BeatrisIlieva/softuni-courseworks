from django.urls import path

from e_commerce_website.common.views import IndexView, \
    SearchBarView, \
    DisplayedLikedJewelries, \
    AddToLikedJewelriesView
urlpatterns = (
    path(
        '',
        IndexView.as_view(),
        name='index_page'
    ),
    path(
        'search/',
        SearchBarView.as_view(),
        name='search_bar'
    ),
    path(
        'like/<int:jewelry_pk>',
        AddToLikedJewelriesView.as_view(),
        name='like_jewelry'
    ),
    path(
        'likes/',
        DisplayedLikedJewelries.as_view(),
        name='display_liked_jewelries'
    ),
)
