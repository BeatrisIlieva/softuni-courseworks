from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('travelers_hub.common.urls')),
    path('traveler/', include('travelers_hub.travelers.urls')),
    path('trips/', include('travelers_hub.trips.urls')),
]
