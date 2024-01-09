from django.contrib import admin
from django.urls import include, path

urlpatterns = (
    path('admin/', admin.site.urls),
    path('', include('e_commerce_website.common.urls')),
    path('', include('e_commerce_website.jewelry.urls')),
    path('', include('e_commerce_website.accounts.urls')),
    path('', include('e_commerce_website.shopping_cart.urls')),
    path('', include('e_commerce_website.order.urls')),
    path('', include('e_commerce_website.profiles.urls')),
    path('', include('e_commerce_website.inventory.urls')),
)
