from django.db import models
from django.core import validators
from django_countries.fields import CountryField

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.profiles.validators import OnlyLettersValidator, \
    OnlyDigitsValidator


class AccountProfile(models.Model):
    ONLY_LETTERS_EXCEPTION_MESSAGE = 'Ensure this value contains only letters.'
    ONLY_DIGITS_EXCEPTION_MESSAGE = 'Ensure this value contains only digits.'

    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MAX_LENGTH = 30

    LAST_NAME_MIN_LENGTH = 2
    LAST_NAME_MAX_LENGTH = 30

    PHONE_NUMBER_MIN_LENGTH = 10
    PHONE_NUMBER_MAX_LENGTH = 30

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                FIRST_NAME_MIN_LENGTH,
            ),
            OnlyLettersValidator(error_message=ONLY_LETTERS_EXCEPTION_MESSAGE),
        ),
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                LAST_NAME_MIN_LENGTH,
            ),
            OnlyLettersValidator(error_message=ONLY_LETTERS_EXCEPTION_MESSAGE),
        ),
    )

    phone_number = models.CharField(
        max_length=PHONE_NUMBER_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                PHONE_NUMBER_MIN_LENGTH,
            ),
            OnlyDigitsValidator(error_message=ONLY_DIGITS_EXCEPTION_MESSAGE)
        ),
    )

    country = CountryField()

    city = models.CharField()

    delivery_address = models.CharField()

    user = models.OneToOneField(
        to=AccountUser,
        on_delete=models.CASCADE,
        primary_key=True
    )

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
