from django.urls import path

from e_commerce_website.accounts.views import (
    RegisterUserView,
    LoginUserView,
    LogoutUserView, CustomUpdateEmailView, CustomUpdatePasswordView
)

urlpatterns = (
    path(
        'register/',
        RegisterUserView.as_view(),
        name='register_user'
    ),
    path(
        'login/',
        LoginUserView.as_view(),
        name='login_user'
    ),
    path(
        'logout/',
        LogoutUserView.as_view(),
        name='logout_user'
    ),
    path(
        'update-email/<int:pk>/',
        CustomUpdateEmailView.as_view(),
        name='update_email'
    ),
    path(
        'update-password/<int:pk>/',
        CustomUpdatePasswordView.as_view(),
        name='update_password'
    ),
)
