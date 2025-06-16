from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class AlphabeticValidator:
    def __init__(self, message=None):
        self.message = message

    @property
    def message(self):
        return self.__message

    @message.setter
    def message(self, value):
        if value is None:
            self.__message = 'Your name must contain letters only!'
        else:
            self.__message = value

    def __call__(self, value):
        if not value.isalpha():
            raise ValidationError(self.message)


@deconstructible
class ExactLengthValidator:
    def __init__(self, length, message=None):
        self.length = length
        self.message = message

    @property
    def message(self):
        return self.__message

    @message.setter
    def message(self, value):
        if value is None:
            self.__message = f'Your passcode must be exactly {self.length} digits!'
        else:
            self.__message = value

    def __call__(self, value):
        if len(value) != self.length:
            raise ValidationError(self.message)
