from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError


@deconstructible
class AlphaNumericUnderscoreValidator:
    def __init__(self, message=None):
        self.message = message

    @property
    def message(self):
        return self.__message

    @message.setter
    def message(self, value):
        if value is not None:
            self.__message = value
        else:
            self.__message = 'Username must contain only letters, digits, and underscores!'

    def __call__(self, value):
        for char in value:

            if not (
                char.isalpha() or
                char.isdigit() or
                char == '_'
            ):
                raise ValidationError(self.message)
