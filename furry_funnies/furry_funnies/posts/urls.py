from django.urls import path, include

from furry_funnies.posts.views import (
    PostCreateView,
    PostDetailView,
    PostUpdateView,
    PostDeleteView,
)

urlpatterns = [
    path('create/', PostCreateView.as_view(), name='post-create'),
    path('<int:post_id>/', include([
        path('details/', PostDetailView.as_view(), name='post-detail'),
        path('edit/', PostUpdateView.as_view(), name='post-update'),
        path('delete/', PostDeleteView.as_view(), name='post-delete'),
    ])),
]
