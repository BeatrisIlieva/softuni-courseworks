from django.urls import path

from furry_funnies.common.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
