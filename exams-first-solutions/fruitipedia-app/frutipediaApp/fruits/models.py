from django.db import models
from django.core.validators import MinLengthValidator
from frutipediaApp.fruits.validators import LettersOnlyValidator


class Fruit(models.Model):
    FRUIT_NAME_MIN_LENGTH = 2
    FRUIT_NAME_MAX_LENGTH = 30
    FRUIT_NAME_UNIQUE_ERROR_MESSAGE = 'This fruit name is already in use! Try a new one.'

    name = models.CharField(
        unique=True,
        max_length=FRUIT_NAME_MAX_LENGTH,
        validators=[
            MinLengthValidator(FRUIT_NAME_MIN_LENGTH),
            LettersOnlyValidator(),
        ],
        error_messages={
            'unique': FRUIT_NAME_UNIQUE_ERROR_MESSAGE,
        }
    )
    
    image_url = models.URLField()
    
    description = models.TextField()
    
    nutrition = models.TextField(
        null=True,
        blank=True,
    )
    
    owner = models.ForeignKey(
        to='profiles.Profile',
        on_delete=models.CASCADE,
    )
