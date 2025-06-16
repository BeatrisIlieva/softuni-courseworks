from django.core.validators import MinLengthValidator, MinValueValidator
from django.db import models

from tasty_recipes_app.recipes.choices import (
    CuisineTypeChoices,
)


class Recipe(models.Model):
    TITLE_MIN_LENGTH = 10
    TITLE_MAX_LENGTH = 100
    TITLE_UNIQUE_ERROR_MESSAGE = 'We already have a recipe with the same title!'

    CUISINE_TYPE_MAX_LENGTH = 7

    INGREDIENTS_HELP_TEXT = 'Ingredients must be separated by a comma and space.'

    COOKING_TIME_HELP_TEXT = 'Provide the cooking time in minutes.'
    COOKING_TIME_MIN_VALUE = 1

    title = models.CharField(
        max_length=TITLE_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                TITLE_MIN_LENGTH,
            )
        ],
        unique=True,
        error_messages={
            'unique': TITLE_UNIQUE_ERROR_MESSAGE,
        }
    )

    cuisine_type = models.CharField(
        max_length=CUISINE_TYPE_MAX_LENGTH,
        choices=CuisineTypeChoices.choices,
    )

    ingredients = models.TextField(
        help_text=INGREDIENTS_HELP_TEXT,
    )

    instructions = models.TextField()

    cooking_time = models.PositiveIntegerField(
        help_text=COOKING_TIME_HELP_TEXT,
        validators=[
            MinValueValidator(COOKING_TIME_MIN_VALUE)
        ]
    )

    image_url = models.URLField(
        null=True,
        blank=True,
    )

    author = models.ForeignKey(
        to='profiles.Profile',
        on_delete=models.CASCADE
    )
