from django.urls import path
from djangoIntroduction.todo_app.views import my_view

urlpatterns = [
    path("", my_view),
]
