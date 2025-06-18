from django.db import models
from todoApp.todos.choices import StateChoice


class Category(models.Model):
    name = models.CharField(
        max_length=15,
    )


class Todo(models.Model):
    title = models.CharField(
        max_length=30,
    )

    description = models.TextField()

    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
    )

    state = models.BooleanField(
        choices=[
            (True, StateChoice.DONE),
            (False, StateChoice.NOT_DONE)
        ],
        default=False,
    )
    
    def __str__(self):
        return self.title
