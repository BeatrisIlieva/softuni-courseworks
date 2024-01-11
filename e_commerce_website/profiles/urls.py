from django.urls import path, include

from e_commerce_website.profiles.views import UserDetailsView, UserUpdateView, \
    UserDeleteView, UserOrdersView

urlpatterns = (
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
        )
    ),
)
