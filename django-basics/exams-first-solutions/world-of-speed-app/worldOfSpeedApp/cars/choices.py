from django.db import models


class TypeChoices(models.TextChoices):
    RALLY = 'R', 'Rally',
    OPEN_WHEEL = 'OW', 'Open-wheel',
    KART = 'K', 'Kart',
    DRAG = 'D', 'Drag',
    OTHER = 'O', 'Other'
