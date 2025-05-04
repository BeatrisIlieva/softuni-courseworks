from django.urls import path, include

from frutipediaApp.dashboard.views import DashboardView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
]
