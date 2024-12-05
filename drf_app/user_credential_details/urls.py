from django.urls import path

from drf_app.user_credential_details.views import UserCredentialDetailsApiViews

urlpatterns = path(
    "user-credential-details/",
    UserCredentialDetailsApiViews.as_view(),
    name="user_credential_details",
)
