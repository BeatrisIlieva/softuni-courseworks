from django.db import models


class CuisineTypeChoices(models.TextChoices):
    FRENCH = 'F', 'French',
    CHINESE = 'C', 'Chinese',
    ITALIAN = 'I', 'Italian',
    BALKAN = 'B', 'Balkan'
    OTHER = 'O', 'Other'
