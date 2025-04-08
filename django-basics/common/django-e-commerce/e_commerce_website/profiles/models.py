from django.db import models
from django.core import validators
from django_countries.fields import CountryField
from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.profiles.validators import (
    OnlyLettersValidator, OnlyDigitsValidator
)


class AccountProfile(models.Model):
    ONLY_LETTERS_FIRST_NAME_EXCEPTION_MESSAGE = \
        'Ensure your First Name contains only letters.'

    ONLY_LETTERS_LAST_NAME_EXCEPTION_MESSAGE = \
        'Ensure your Last Name contains only letters.'

    ONLY_DIGITS_PHONE_NUMBER_EXCEPTION_MESSAGE = \
        'Ensure your Phone Number contains only digits.'

    ONLY_LETTERS_CITY_EXCEPTION_MESSAGE = \
        'Ensure your Your City contains only letters.'

    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MAX_LENGTH = 30

    LAST_NAME_MIN_LENGTH = 2
    LAST_NAME_MAX_LENGTH = 30

    PHONE_NUMBER_MIN_LENGTH = 10
    PHONE_NUMBER_MAX_LENGTH = 30

    CITY_MIN_LENGTH = 2
    CITY_MAX_LENGTH = 30

    ADDRESS_MIN_LENGTH = 2
    ADDRESS_MAX_LENGTH = 30

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,

        error_messages={'max_length': f'Ensure your First Name does not exceed {FIRST_NAME_MAX_LENGTH} characters.'},

        validators=(
            validators.MinLengthValidator(
                FIRST_NAME_MIN_LENGTH,
                message=f'Ensure your First Name consists of at least {FIRST_NAME_MIN_LENGTH} characters.'
            ),

            OnlyLettersValidator(
                error_message=ONLY_LETTERS_FIRST_NAME_EXCEPTION_MESSAGE
            ),
        ),
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        error_messages={'max_length': f'Ensure your Last Name does not exceed {LAST_NAME_MAX_LENGTH} characters.'},

        validators=(
            validators.MinLengthValidator(
                LAST_NAME_MIN_LENGTH,
                message=f'Ensure your Last Name consists of at least {LAST_NAME_MIN_LENGTH} characters.'
            ),

            OnlyLettersValidator(
                error_message=ONLY_LETTERS_LAST_NAME_EXCEPTION_MESSAGE
            ),
        ),
    )

    phone_number = models.CharField(
        max_length=PHONE_NUMBER_MAX_LENGTH,
        error_messages={'max_length': f'Ensure your Phone Number does not exceed {PHONE_NUMBER_MAX_LENGTH} digits.'},

        validators=(
            validators.MinLengthValidator(
                PHONE_NUMBER_MIN_LENGTH,
                message=f'Ensure your Phone Number consist of at least {PHONE_NUMBER_MIN_LENGTH} digits.'
            ),

            OnlyDigitsValidator(
                error_message=ONLY_DIGITS_PHONE_NUMBER_EXCEPTION_MESSAGE
            )
        ),
    )

    country = CountryField()

    city = models.CharField(
        max_length=CITY_MAX_LENGTH,
        error_messages={'max_length': f'Ensure your City does not exceed {CITY_MAX_LENGTH} characters.'},

        validators=(
            validators.MinLengthValidator(
                CITY_MIN_LENGTH,
                message=f'Ensure your City consist of at least {CITY_MIN_LENGTH} characters.'
            ),

            OnlyLettersValidator(
                error_message=ONLY_LETTERS_CITY_EXCEPTION_MESSAGE
            )
        ),
    )

    delivery_address = models.CharField(
        max_length=ADDRESS_MAX_LENGTH,
        error_messages={'max_length': f'Ensure your Address does not exceed {ADDRESS_MAX_LENGTH} characters.'},

        validators=(
            validators.MinLengthValidator(
                ADDRESS_MIN_LENGTH,
                message=f'Ensure your Address consist of at least {ADDRESS_MIN_LENGTH} characters.'
            ),
        ),
    )

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
