from django.urls import path

from e_commerce_website.wishlist.views import (
    LikeJewelryView,
    DisplayedLikedJewelries
)

urlpatterns = (
    path(
        'like/<int:jewelry_pk>',
        LikeJewelryView.as_view(),
        name='like_jewelry'
    ),
    path(
        'likes/',
        DisplayedLikedJewelries.as_view(),
        name='display_liked_jewelries'
    ),
)
