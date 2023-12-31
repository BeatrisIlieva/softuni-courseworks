from django.urls import path, include

from e_commerce_website.accounts.views import RegisterUserView, \
    LoginUserView, \
    LogoutUserView, \
    UserDetailsView, \
    UserUpdateView, \
    UserDeleteView, \
    UserOrdersView

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
        'profile/<int:pk>/', include(
            [
                path(
                    '',
                    UserDetailsView.as_view(),
                    name='details_user'
                ),
                path(
                    'update/',
                    UserUpdateView.as_view(),
                    name='update_user'
                ),
                path(
                    'delete/',
                    UserDeleteView.as_view(),
                    name='delete_user'
                ),
                path(
                    'my-orders/',
                    UserOrdersView.as_view(),
                    name='my_orders'
                ),
            ]
        ))
)
