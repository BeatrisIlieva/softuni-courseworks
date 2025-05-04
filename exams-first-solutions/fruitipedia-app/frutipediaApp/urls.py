from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frutipediaApp.common.urls')),
    path('dashboard/', include('frutipediaApp.dashboard.urls')),
    path('fruit/', include('frutipediaApp.fruits.urls')),
    path('profile/', include('frutipediaApp.profiles.urls')),
]
