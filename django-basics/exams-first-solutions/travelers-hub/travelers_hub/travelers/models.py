from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.db import models

from travelers_hub.travelers.validators import AlphaNumericValidator


class Traveler(models.Model):
    NICKNAME_MAX_LENGTH = 30
    NICKNAME_MIN_LENGTH = 3
    NICKNAME_HELP_TEXT = '*Nicknames can contain only letters and digits.'

    EMAIL_MAX_LENGTH = 30

    COUNTRY_LENGTH = 3

    nickname = models.CharField(
        unique=True,
        max_length=NICKNAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                NICKNAME_MIN_LENGTH
            ),
            AlphaNumericValidator(),
        ],
        help_text='*Nicknames can contain only letters and digits.',
    )

    email = models.EmailField(
        unique=True,
        max_length=EMAIL_MAX_LENGTH,
    )

    country = models.CharField(
        validators=[
            MaxLengthValidator(COUNTRY_LENGTH),
            MinLengthValidator(COUNTRY_LENGTH),
        ]
    )

    about_me = models.TextField(
        null=True,
        blank=True,
    )
