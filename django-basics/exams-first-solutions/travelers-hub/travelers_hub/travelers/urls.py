from django.urls import path

from travelers_hub.travelers.views import (
    TravelerCreateView,
    TravelerDetailView,
    TravelerUpdateView,
    TravelerDeleteView,
)


urlpatterns = [
    path('create/', TravelerCreateView.as_view(), name='traveler-create'),
    path('details/', TravelerDetailView.as_view(), name='traveler-detail'),
    path('edit/', TravelerUpdateView.as_view(), name='traveler-update'),
    path('delete/', TravelerDeleteView.as_view(), name='traveler-delete'),
]
