from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator

from petstagram.pets.models import Pet
from petstagram.photos.validators import FileSizeValidator


class Photo(models.Model):
    MAX_FILE_SIZE = 5
    DESCRIPTION_MIN_LENGTH = 10
    DESCRIPTION_MAX_LENGTH = 300

    photo = models.ImageField(
        upload_to='images',
        validators=[
            FileSizeValidator(MAX_FILE_SIZE),
        ],
    )

    description = models.TextField(
        validators=[
            MinLengthValidator(DESCRIPTION_MIN_LENGTH),
            MaxLengthValidator(DESCRIPTION_MAX_LENGTH),
        ],
    )

    location = models.CharField(
        max_length=30,
    )

    tagged_pets = models.ManyToManyField(
        to=Pet,
    )

    date_of_publication = models.DateField(
        auto_now_add=True,
    )
