from django.db import models
from django.core import validators
from django_countries.fields import CountryField

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.profiles.validators import OnlyLettersValidator, \
    OnlyDigitsValidator


class AccountProfile(models.Model):
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
            OnlyLettersValidator(),
        ),
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                LAST_NAME_MIN_LENGTH,
            ),
            OnlyLettersValidator(),
        ),
    )

    phone_number = models.CharField(
        max_length=PHONE_NUMBER_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                PHONE_NUMBER_MIN_LENGTH,
            ),
            OnlyDigitsValidator()
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
