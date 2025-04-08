from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class OnlyLettersValidator:
    def __init__(self, error_message):
        self.error_message = error_message

    def __call__(self, value):
        for ch in value:
            if not ch.isalpha():
                raise ValidationError(
                    message=self.error_message,
                    code='invalid',
                )


@deconstructible
class OnlyDigitsValidator:
    def __init__(self, error_message):
        self.error_message = error_message

    def __call__(self, value):
        for d in value:
            if not d.isdigit():
                raise ValidationError(
                    message=self.error_message,
                    code='invalid',
                )