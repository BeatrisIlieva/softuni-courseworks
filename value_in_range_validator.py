from django import forms
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.deconstruct import deconstructible


@deconstructible #in order to be used for models as well not only forms
class ValueInRangeValidator:
    def __init__(self, min_value, max_value):
        self.min_value = min_value
        self.max_value = max_value

    def __call__(self, value):
        if value < self.min_value or value > self.max_value:
            raise ValidationError(
                message=f'Value must be between {self.min_value} and {self.max_value}',
                code='invalid',
            )

    def __eq__(self, other): #in order to be used for models as well not only forms
        return (
            isinstance(other, self.__class__)
            and self.min_value == other.min_value
            and self.max_value == other.max_value
        )

class Profile(models.Model):
    MIN_USERNAME_LENGTH = 6
    MAX_USERNAME_LENGTH = 26
    MIN_PASSWORD_LENGTH = 8
    MAX_PASSWORD_LENGTH = 16

    username = models.CharField(
        max_length=MAX_USERNAME_LENGTH,
    )
    password = models.CharField(
        max_length=MAX_PASSWORD_LENGTH,
    )

class ProfileForm(forms.ModelForm):
    MIN_VALUE = 8
    MAX_VALUE = 16
    class Meta:
        model = Profile
        fields = '__all__'

        error_messages = {
            'username': {

            }
        }


    username = forms.CharField(
        validators=ValueInRangeValidator(MIN_VALUE, MAX_VALUE),
        error_messages={
            'required': 'Custom message',
            'invalid': 'Custom message'
        }
    )

    password = forms.CharField(
        validators=(
            ValueInRangeValidator(MIN_VALUE,MAX_VALUE),
        ),
        error_messages={
            'required': 'Custom message',
            'invalid': 'Custom message'
        }

    )

