from django.urls import include, path
from forumApp.posts import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('dashboard/', views.DashBoardView.as_view(), name='dashboard'),
    path('add-post/', views.PostCreateForm.as_view(), name='add-post'),
    path('<int:pk>/', include([
        path('delete-post/', views.DeletePostView.as_view(), name='delete-post'),
        path('details-post/', views.details_post, name='details-post'),
        path('edit-post/', views.UpdatePostView.as_view(), name='edit-post'),
    ])),
    path('redirect-home/', views.RedirectHomeView.as_view(), name='redirect-view'),
]
