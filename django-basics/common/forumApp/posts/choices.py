from django.db import models


class LanguageChoice(models.TextChoices):
    PYTHON = 'py', 'Python'
    JAVASCRIPT = 'js', 'JavaScript'
    C = 'c', 'C'
    OTHER = 'other', 'Other'
