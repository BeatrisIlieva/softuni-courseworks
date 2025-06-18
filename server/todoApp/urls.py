from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView
)

from todoApp.todos.views import TodoDetailView


urlpatterns = [
    path('',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('admin/', admin.site.urls),
    path('auth/', include('todoApp.accounts.urls')),
    path('todos/', include('todoApp.todos.urls')),
    path('<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),
]
