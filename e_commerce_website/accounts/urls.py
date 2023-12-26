from django.urls import path

from e_commerce_website.accounts.views import RegisterUserView, LoginUserView, LogoutUserView, AccountOptionsView

urlpatterns = (
    path('account/', AccountOptionsView.as_view(), name='account_options'),
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('login/', LoginUserView.as_view(), name='login_user'),
    path('logout/', LogoutUserView.as_view(), name='logout_user'),
)
