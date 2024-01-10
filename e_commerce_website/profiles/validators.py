from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


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


@deconstructible
class OnlyDigitsValidator:
    ONLY_DIGITS_EXCEPTION_MESSAGE = 'Ensure this value contains only digits.'

    def __call__(self, value):
        for d in value:
            if not d.isdigit():
                raise ValidationError(
                    message=self.ONLY_DIGITS_EXCEPTION_MESSAGE,
                    code='invalid',
                )



