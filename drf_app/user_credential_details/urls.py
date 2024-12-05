from django.urls import path
from rest_framework.routers import DefaultRouter

from drf_app.user_credential_details.views import (
    UserCredentialDetailsApiViews,
    UserCredentialsApiViewSet,
)

router = DefaultRouter()

router.register(
    "user-credential-details",
    UserCredentialsApiViewSet,
    basename="user_credential_details_create_user_credential_details",
)

# print(router.urls)

urlpatterns = (
    # *router.urls,
    # # http://localhost:8000/user-credential-details/
    
    path(
        "user-credential-details/",
        UserCredentialsApiViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    ## http://localhost:8000/user-credential-details/user-credential-details/

    # path(
    #     "user-credential-details/",
    #     UserCredentialDetailsApiViews.as_view(),
    #     name="user_credential_details_create_user_credential_details",
    # ),
    ## http://localhost:8000/user-credential-details/user-credential-details/
)
