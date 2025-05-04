from django.db import models


class GenreChoices(models.TextChoices):
    POP = 'Pop', 'Pop Music'
    JAZZ = 'Jazz', 'Jazz Music'
    R_B = 'R&B', 'R&B Music'
    ROCK = 'Rock', 'Rock Music'
    COUNTRY = 'Country', 'Country Music'
    DANCE = 'Dance', 'Dance Music'
    HIP_HOP = 'Hip Hop', 'Hip Hop Music'
    OTHER = 'Other', 'Other'
