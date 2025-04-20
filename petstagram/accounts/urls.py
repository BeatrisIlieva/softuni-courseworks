from django.urls import path, include

from petstagram.accounts import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('profile/<int:pk>/', include([
        path('', views.details, name='profile-details'),
        path('edit/', views.edit, name='profile-edit'),
        path('delete/', views.delete, name='profile-delete'),
    ]))
]
