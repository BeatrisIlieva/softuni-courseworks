from django.db import models

from forumApp.posts.choices import LanguageChoices
from forumApp.posts.validators import BadLanguageValidator


class Address(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    street_address = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.street_address}, {self.city}, {self.postal_code}, {self.country}"


class Post(models.Model):
    TITLE_MAX_LENGTH = 100

    title = models.CharField(
        max_length=TITLE_MAX_LENGTH,
    )

    content = models.TextField(
        validators=[
            BadLanguageValidator(),
        ]
    )

    author = models.CharField(
        max_length=30,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    languages = models.CharField(
        max_length=20,
        choices=LanguageChoices.choices,
        default=LanguageChoices.OTHER,
    )

    image = models.ImageField(
        upload_to='post_images/',
    )


class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
    )

    author = models.CharField(
        max_length=100,
    )

    content = models.TextField()

    create_at = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True,
    )
