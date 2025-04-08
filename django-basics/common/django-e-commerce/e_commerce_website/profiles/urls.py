from django.urls import path, include

from e_commerce_website.profiles.views import (
    UserUpdateView,
    UserDeleteView
)

urlpatterns = (
    path(
        'profile/<int:pk>/', include(
            [
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

            ]
        )
    ),
)
