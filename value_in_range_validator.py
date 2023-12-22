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
            raise ValidationError(f'Value must be between {self.min_value} and {self.max_value}')

    def __eq__(self, other): #in order to be used for models as well not only forms
        return (
            isinstance(other, self.__class__)
            and self.min_value == other.min_value
            and self.max_value == other.max_value
        )

class Profile(models.Model):
    pass

class ProfileForm(forms.ModelForm):
    MIN_VALUE = 8
    MAX_VALUE = 16
    class Meta:
        pass

    password = forms.CharField(
        validators=(
            ValueInRangeValidator(
                MIN_VALUE,
                MAX_VALUE,
            )
        )
    )

