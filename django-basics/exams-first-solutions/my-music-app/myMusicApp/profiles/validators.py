from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError


@deconstructible
class AlphanumericUnderscoreValidator:
    DEFAULT_MESSAGE = 'Ensure this value contains only letters, numbers, and underscore.'

    def __init__(self, message=None):
        self.message = message

    @property
    def message(self):
        return self.__message

    @message.setter
    def message(self, value):
        if value is None:
            self.__message = self.DEFAULT_MESSAGE
        else:
            self.__message = value

    def __call__(self, value):
        for char in value:
            if not (char.isalnum() or char == '_'):
                raise ValidationError(self.message)
