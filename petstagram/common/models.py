from django.db import models

from petstagram.photos.models import Photo


class Comment(models.Model):
    TEXT_MAX_LENGTH = 300

    text = models.TextField(
        max_length=TEXT_MAX_LENGTH,
    )

    date_and_time_of_publication = models.DateTimeField(
        auto_now_add=True,
    )

    to_photo = models.ForeignKey(
        to=Photo,
        on_delete=models.CASCADE,
    )


class Like(models.Model):
    to_photo = models.ForeignKey(
        to=Photo,
        on_delete=models.CASCADE,
    )
