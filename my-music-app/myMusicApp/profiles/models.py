from django.db import models
from django.core.validators import MinLengthValidator

from myMusicApp.profiles.validators import AlphanumericUnderscoreValidator


class Profile(models.Model):
    USERNAME_MAX_LENGTH = 15
    USERNAME_MIN_LENGTH = 2
    USERNAME_ERROR_MESSAGE = 'Ensure this value contains only letters, numbers, and underscore.'

    username = models.CharField(
        max_length=USERNAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                USERNAME_MIN_LENGTH,
            ),
            AlphanumericUnderscoreValidator(
                message=USERNAME_ERROR_MESSAGE,
            )
        ],
    )

    email = models.EmailField()

    age = models.PositiveIntegerField(
        null=True,
        blank=True,
    )
