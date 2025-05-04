from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('worldOfSpeedApp.common.urls')),
    path('cars/', include('worldOfSpeedApp.cars.urls')),
    path('profiles/', include('worldOfSpeedApp.profiles.urls')),
]
