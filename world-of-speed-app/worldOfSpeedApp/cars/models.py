from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator

from worldOfSpeedApp.cars.choices import TypeChoices
from worldOfSpeedApp.cars.validators import RangeValidator


class Car(models.Model):
    CAR_MAX_LENGTH = 10

    TYPE_MAX_LENGTH = 10

    MODEL_MAX_LENGTH = 15
    MODEL_MIN_LENGTH = 1

    IMAGE_URL_UNIQUE_ERROR_MESSAGE = 'This image URL is already in use! Provide a new one.'

    PRICE_MIN_VALUE = 1.0

    type = models.CharField(
        max_length=TYPE_MAX_LENGTH,
        choices=TypeChoices.choices,
    )

    model = models.CharField(
        max_length=MODEL_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                MODEL_MIN_LENGTH,
            ),
        ]
    )

    year = models.IntegerField(
        validators=[
            RangeValidator(),
        ]
    )

    image_url = models.URLField(
        unique=True,
        error_messages={
            'unique': IMAGE_URL_UNIQUE_ERROR_MESSAGE,
        }
    )

    price = models.FloatField(
        validators=[
            MinValueValidator(
                PRICE_MIN_VALUE,
            )
        ]
    )

    owner = models.ForeignKey(
        to='profiles.Profile',
        on_delete=models.CASCADE,
    )
