from django.urls import path, include

from myMusicApp.profiles import views

urlpatterns = [
    path('create/', views.CreateProfileView.as_view(), name='create-profile'),
    path('details/', views.DetailsProfileView.as_view(), name='details-profile'),
    path('delete/', views.DeleteProfileView.as_view(), name='delete-profile'),
]