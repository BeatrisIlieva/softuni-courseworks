from django.urls import path, include

from myMusicApp.common import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home-page'),
]