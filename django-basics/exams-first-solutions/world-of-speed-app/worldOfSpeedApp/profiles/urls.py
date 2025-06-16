from django.urls import path

from worldOfSpeedApp.profiles.views import (
    ProfileCreateView,
    ProfileDetailView,
    ProfileUpdateView,
    ProfileDeleteView,
)

urlpatterns = [
    path('create/', ProfileCreateView.as_view(), name='profile-create'),
    path('details/', ProfileDetailView.as_view(), name='profile-detail'),
    path('edit/', ProfileUpdateView.as_view(), name='profile-update'),
    path('delete/', ProfileDeleteView.as_view(), name='profile-delete'),
]
