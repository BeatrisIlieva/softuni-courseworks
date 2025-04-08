from django.urls import path, include

from forumApp.posts.views import index, add_post, dashboard, delete_post, details_post, edit_post

urlpatterns = [
    path('', index, name='index'),
    path('dashboard/', dashboard, name='dashboard'),
    path('add-post/', add_post, name='add-post'),
        path('<int:pk>/', include([
        path('details-post/', details_post, name='details-post'),
        path('edit-post/', edit_post, name='edit-post'),
        path('delete-post/', delete_post, name='delete-post'),
    ]))
]
