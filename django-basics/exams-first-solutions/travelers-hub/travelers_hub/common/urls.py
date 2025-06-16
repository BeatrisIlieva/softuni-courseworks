from django.urls import path

from travelers_hub.common.views import (
    IndexView,
    TripListView,
)


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('all-trips/', TripListView.as_view(), name='trip-list'),
]
