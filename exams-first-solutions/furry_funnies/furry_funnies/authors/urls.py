from django.urls import path, include

from furry_funnies.authors.views import (
    AuthorCreateView,
    AuthorDetailView,
    AuthorUpdateView,
    AuthorDeleteView,
)

urlpatterns = [
    path('create/', AuthorCreateView.as_view(), name='author-create'),
    path('details/', AuthorDetailView.as_view(), name='author-detail'),
    path('edit/', AuthorUpdateView.as_view(), name='author-update'),
    path('delete/', AuthorDeleteView.as_view(), name='author-delete'),
]
