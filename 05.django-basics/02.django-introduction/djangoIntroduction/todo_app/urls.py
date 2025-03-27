from django.urls import path
from djangoIntroduction.todo_app.views import index, add_view

urlpatterns = [
    path("", index),
    path("add-my-todo/", add_view),
]
