from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError


@deconstructible
class AlphanumericUnderscoreValidator:
    def __init__(self, message):
        self.message = message

    def __call__(self, value):
        for char in value:
            if not (char.isalnum() or char == '_'):
                raise ValidationError(self.message)
