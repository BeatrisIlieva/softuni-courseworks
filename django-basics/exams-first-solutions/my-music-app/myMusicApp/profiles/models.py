from django.db import models
from django.core.validators import MinLengthValidator

from myMusicApp.profiles.validators import AlphanumericUnderscoreValidator


class Profile(models.Model):
    USERNAME_MAX_LENGTH = 15
    USERNAME_MIN_LENGTH = 2

    username = models.CharField(
        max_length=USERNAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                USERNAME_MIN_LENGTH,
            ),
            AlphanumericUnderscoreValidator()
        ],
    )

    email = models.EmailField()

    age = models.PositiveIntegerField(
        null=True,
        blank=True,
    )
