from django.urls import path

from furry_funnies.dashboard.views import DashboardView

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
