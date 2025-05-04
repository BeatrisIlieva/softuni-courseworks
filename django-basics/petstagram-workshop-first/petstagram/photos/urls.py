from django.urls import path, include

from petstagram.photos import views

urlpatterns = [
    path('add/', views.PhotoAddPage.as_view(), name='photo-add'),
    path('<int:pk>/', include([
        path('', views.PhotoDetailsPage, name='photo-details'),
        path('edit/', views.PhotoEditPage, name='photo-edit'),
        path('delete/', views.photo_delete, name='photo-delete'),
    ])),
]
