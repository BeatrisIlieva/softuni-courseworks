from django.urls import path

from petstagram.common import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home-page'),
    path('like/<int:pk>/', views.like_functionality, name='like'),
    path('share/<int:pk>/', views.share_functionality, name='share'),
    path('comment/<int:pk>/', views.comment_functionality, name='comment'),
]
