from django.urls import path, include

from frutipediaApp.common.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
