from django.db import models


class GenreChoices(models.TextChoices):
    POP_MUSIC = 'PM', 'Pop Music'
    JAZZ_MUSIC = 'JM', 'Jazz Music'
    R_B_MUSIC = 'RBM', 'R&B Music'
    ROCK_MUSIC = 'RM', 'Rock Music'
    COUNTRY_MUSIC = 'CM', 'Country Music'
    DANCE_MUSIC = 'DM', 'Dance Music'
    HIP_HOP_MUSIC = 'HHM', 'Hip Hop Music'
    OTHER = 'OT', 'Other'
