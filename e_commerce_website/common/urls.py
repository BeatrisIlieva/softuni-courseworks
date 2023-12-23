from django.urls import path

from e_commerce_website.common.views import NavigationBarView


urlpatterns = (
    # path('', index_page, name='index-page'),
    path('', NavigationBarView.as_view(), name='index-page'),
)