from django.contrib import admin
from django.urls import path, include

urlpatterns = (
    path("admin/", admin.site.urls),
    path("product/", include("drf_app.product.urls")),
    path("user-credential-details/", include("drf_app.user_credential_details.urls")),
)
