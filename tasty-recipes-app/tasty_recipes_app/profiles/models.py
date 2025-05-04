from django.core.validators import MinLengthValidator
from django.db import models

from tasty_recipes_app.profiles.validators import (
    StartsWithCapitalLetterValidator,
)


class Profile(models.Model):
    NICKNAME_MIN_LENGTH = 2
    NICKNAME_MAX_LENGTH = 20
    NICKNAME_MIN_LENGTH_ERROR_MESSAGE = 'Nickname must be at least 2 chars long!'

    FIRST_NAME_MAX_LENGTH = 30

    LAST_NAME_MAX_LENGTH = 30

    nickname = models.CharField(
        max_length=NICKNAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                NICKNAME_MIN_LENGTH,
                NICKNAME_MIN_LENGTH_ERROR_MESSAGE,
            )
        ],
        unique=True,
    )

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        validators=[
            StartsWithCapitalLetterValidator(),
        ]
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=[
            StartsWithCapitalLetterValidator(),
        ]
    )

    chef = models.BooleanField(
        default=False,
    )

    bio = models.TextField()
