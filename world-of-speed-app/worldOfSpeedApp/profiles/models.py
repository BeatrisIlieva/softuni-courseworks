from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator

from worldOfSpeedApp.profiles.validators import AlphaNumericUnderscoreValidator


class Profile(models.Model):
    USERNAME_MAX_LENGTH = 15
    USERNAME_MIN_LENGTH = 3
    USERNAME_MIN_LENGTH_ERROR_MESSAGE = 'Username must be at least 3 chars long!'

    AGE_MIN_VALUE = 21
    AGE_HELP_TEXT = 'Age requirement: 21 years and above.'

    PASSWORD_MAX_LENGTH = 20

    FIRST_NAME_MAX_LENGTH = 25

    LAST_NAME_MAX_LENGTH = 25

    username = models.CharField(
        max_length=USERNAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                USERNAME_MIN_LENGTH,
                USERNAME_MIN_LENGTH_ERROR_MESSAGE
            ),
            AlphaNumericUnderscoreValidator(),
        ]
    )

    email = models.EmailField()

    age = models.IntegerField(
        help_text=AGE_HELP_TEXT,
        validators=[
            MinValueValidator(
                AGE_MIN_VALUE
            ),
        ]
    )

    password = models.CharField(
        max_length=PASSWORD_MAX_LENGTH,
    )

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        null=True,
        blank=True,
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        null=True,
        blank=True,
    )

    profile_picture = models.URLField(
        null=True,
        blank=True,
    )
