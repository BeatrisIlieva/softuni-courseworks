from django.urls import path

from e_commerce_website.common.views import index_page


urlpatterns = (
    path('', index_page, name='index-page'),
)