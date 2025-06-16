from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError


@deconstructible
class MustStartWithALetterValidator:
    def __init__(self, message=None):
        self.message = message

    @property
    def message(self):
        return self.__message

    @message.setter
    def message(self, value):
        if value is None:
            self.__message = 'Your name must start with a letter!'
        else:
            self.__message = value

    def __call__(self, value):
        if not value[0].isalpha():
            raise ValidationError(self.message)
