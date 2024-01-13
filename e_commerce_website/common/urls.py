from django.urls import path

from e_commerce_website.common.views import IndexView, SearchBarView

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
)
