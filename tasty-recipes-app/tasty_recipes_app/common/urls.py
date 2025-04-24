from django.urls import path

from tasty_recipes_app.common.views import (
    IndexView,
)

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
