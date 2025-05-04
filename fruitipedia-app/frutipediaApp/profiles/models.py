from django.db import models
from django.core.validators import MinLengthValidator

from frutipediaApp.profiles.validators import MustStartWithALetterValidator


class Profile(models.Model):
    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MAX_LENGTH = 25

    LAST_NAME_MIN_LENGTH = 1
    LAST_NAME_MAX_LENGTH = 35

    EMAIL_MAX_LENGTH = 40

    PASSWORD_MIN_LENGTH = 8
    PASSWORD_MAX_LENGTH = 20
    PASSWORD_HELP_TEXT = '*Password length requirements: 8 to 20 characters'

    AGE_DEFAULT_VALUE = 18

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(FIRST_NAME_MIN_LENGTH),
            MustStartWithALetterValidator(),
        ],
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(LAST_NAME_MIN_LENGTH),
            MustStartWithALetterValidator(),
        ],
    )

    email = models.EmailField(
        unique=True,
        max_length=EMAIL_MAX_LENGTH,
    )

    password = models.CharField(
        max_length=PASSWORD_MAX_LENGTH,
        validators=[
            MinLengthValidator(PASSWORD_MIN_LENGTH),
        ],
        help_text=PASSWORD_HELP_TEXT,
    )

    image_url = models.URLField(
        null=True,
        blank=True,
    )

    age = models.IntegerField(
        null=True,
        blank=True,
        default=AGE_DEFAULT_VALUE,
    )
