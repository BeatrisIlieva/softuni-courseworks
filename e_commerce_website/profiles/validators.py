from django.core import exceptions
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible

ONLY_LETTERS_EXCEPTION_MESSAGE = 'Ensure this value contains only letters.'
ONLY_DIGITS_EXCEPTION_MESSAGE = 'Ensure this value contains only digits.'


@deconstructible
class OnlyLettersValidator:
    ONLY_LETTERS_EXCEPTION_MESSAGE = 'Ensure this value contains only letters.'

    def __call__(self, value):
        for ch in value:
            if not ch.isalpha():
                raise ValidationError(
                    message=self.ONLY_LETTERS_EXCEPTION_MESSAGE,
                    code='invalid',
                )


def validate_only_letters(value):
    for ch in value:
        if not ch.isalpha():
            raise exceptions.ValidationError(ONLY_LETTERS_EXCEPTION_MESSAGE)


def validate_only_digits(value):
    for d in value:
        if not d.isdigit():
            raise exceptions.ValidationError(ONLY_LETTERS_EXCEPTION_MESSAGE)
