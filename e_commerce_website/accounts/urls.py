from django.urls import path

from e_commerce_website.accounts.views import RegisterUserView, LoginUserView, LogoutUserView, UserDetailsView

urlpatterns = (
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('login/', LoginUserView.as_view(), name='login_user'),
    path('logout/', LogoutUserView.as_view(), name='logout_user'),
    path('profile/<int:pk>/', UserDetailsView.as_view(), name='details_user'),
)
