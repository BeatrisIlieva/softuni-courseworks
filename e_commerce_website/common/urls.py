from django.urls import path

from e_commerce_website.common.views import NavigationBarView, \
    SearchBarView, \
    DisplayedLikedJewelries, \
    like_jewelry

urlpatterns = (
    path(
        '',
        NavigationBarView.as_view(),
        name='index_page'
    ),
    path(
        'search/',
        SearchBarView.as_view(),
        name='search_bar'
    ),
    path(
        'like/<int:jewelry_pk>',
        like_jewelry,
        name='like_jewelry'
    ),
    path('likes/<int:pk>', DisplayedLikedJewelries.as_view(), name='display_liked_jewelries'),
)