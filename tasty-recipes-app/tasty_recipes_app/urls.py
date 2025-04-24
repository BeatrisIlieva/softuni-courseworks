from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tasty_recipes_app.common.urls')),
    path('profile/', include('tasty_recipes_app.profiles.urls')),
    path('recipe/', include('tasty_recipes_app.recipes.urls')),
]
