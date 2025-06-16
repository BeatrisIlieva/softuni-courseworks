from django.urls import path, include

from worldOfSpeedApp.cars.views import (
    CarListView,
    CarCreateView,
    CarDetailView,
    CarUpdateView,
    CarDeleteView
)

urlpatterns = [
    path('car/', include([
        path('catalogue/', CarListView.as_view(), name='car-list'),
        path('create/', CarCreateView.as_view(), name='car-create'),
        path('<int:id>/', include([
            path('details/', CarDetailView.as_view(), name='car-detail'),
            path('edit/', CarUpdateView.as_view(), name='car-update'),
            path('delete/', CarDeleteView.as_view(), name='car-delete'),
        ])),
    ])),
]
