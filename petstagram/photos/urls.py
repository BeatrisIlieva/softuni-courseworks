from django.urls import path, include

from petstagram.photos import views

urlpatterns = [
    path('add/', views.AddPhotoView.as_view(), name='add-photo'),
    path('<int:pk>/', include([
        path('', views.DetailsPhotoView.as_view(), name='photo-details'),
        path('edit/', views.EditPhotoView.as_view(), name='photo-edit'),
        path('delete/', views.photo_delete, name='photo-delete'),
    ]))
]
