from django.db import models


class LanguageChoices(models.TextChoices):
    PYTHON = 'Py', 'Python'
    JAVASCRIPT = 'JS', 'Javascript'
    C = 'C', 'C'
    OTHER = 'OT', 'Other'
