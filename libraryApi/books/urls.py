from django.urls import path, include
from libraryApi.books import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', views.PublisherViewSet)

urlpatterns = [
    path('books/', views.ListBooksView.as_view(), name='index'),
    path('book/<int:pk>/', views.BookViewSet.as_view(), name='book_viewset'),
    path('publisher-links/', views.PublisherHyperlinkView.as_view(), name='publisher-link'),
    # path('publisher/<int:pk>/', views.PublisherDetail.as_view(), name='publisher-detail'),
    path('publishers/', include(router.urls))
    
]
