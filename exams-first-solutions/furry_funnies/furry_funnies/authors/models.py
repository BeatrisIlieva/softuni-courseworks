from django.core.validators import MinLengthValidator
from django.db import models

from furry_funnies.authors.validators import (
    AlphabeticValidator,
    ExactLengthValidator,
)


class Author(models.Model):
    FIRST_NAME_MAX_LENGTH = 40
    FIRST_NAME_MIN_LENGTH = 4

    LAST_NAME_MAX_LENGTH = 50
    LAST_NAME_MIN_LENGTH = 2

    PASSCODE_LENGTH = 6

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                FIRST_NAME_MIN_LENGTH
            ),
            AlphabeticValidator(),
        ],
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                LAST_NAME_MIN_LENGTH
            ),
            AlphabeticValidator(),
        ],
    )

    passcode = models.CharField(
        validators=[
            ExactLengthValidator(
                PASSCODE_LENGTH,
            ),
        ],
        help_text=f'Your passcode must be a combination of {PASSCODE_LENGTH} digits'
    )

    pets_number = models.PositiveSmallIntegerField()

    info = models.TextField(
        null=True,
        blank=True,
    )

    image_url = models.URLField(
        null=True,
        blank=True,
    )
