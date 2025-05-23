from django.db import models
from django.core.validators import MinValueValidator

from myMusicApp.albums.choices import GenreChoices


class Album(models.Model):
    ALBUM_NAME_MAX_LENGTH = 30
    ARTIST_MAX_LENGTH = 30
    GENRE_MAX_LENGTH = 30
    PRICE_MIN_VALUE = 0.0

    album_name = models.CharField(
        max_length=ALBUM_NAME_MAX_LENGTH,
        unique=True,
    )

    artist = models.CharField(
        max_length=ARTIST_MAX_LENGTH,
    )

    genre = models.CharField(
        max_length=GENRE_MAX_LENGTH,
        choices=GenreChoices.choices,
    )

    description = models.TextField(
        null=True,
        blank=True,
    )

    image_url = models.URLField()

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
