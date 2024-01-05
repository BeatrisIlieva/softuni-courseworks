from django.urls import path

from e_commerce_website.accounts.views import RegisterUserView

urlpatterns = (
    path(
        'register/',
        RegisterUserView.as_view(),
        name='register_user'
    ),
)
