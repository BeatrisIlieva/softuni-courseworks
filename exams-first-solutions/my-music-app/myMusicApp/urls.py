from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myMusicApp.common.urls')),
    path('albums/', include('myMusicApp.albums.urls')),
    path('profiles/', include('myMusicApp.profiles.urls')),
]
