from django.urls import path, include

from travelers_hub.trips.views import (
    TripCreateView,
    TripDetailView,
    TripUpdateView,
    TripDeleteView,
)


urlpatterns = [
    path('create/', TripCreateView.as_view(), name='trip-create'),
    path('<int:trip_pk>/', include([
        path('details/', TripDetailView.as_view(), name='trip-detail'),
        path('edit/', TripUpdateView.as_view(), name='trip-update'),
        path('delete/', TripDeleteView.as_view(), name='trip-delete'),
    ])),
]
