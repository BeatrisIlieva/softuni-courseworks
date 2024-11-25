from django.db import models
from django.core.exceptions import ValidationError

from django.core.validators import (
    MinLengthValidator,
    RegexValidator,
    MaxLengthValidator,
)

from django_ecommerce_strategy_pattern.user_shipping_details.clean_rules import (
    CLEAN_RULES,
)


class UserShippingDetails(models.Model):

    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE = (
        f"First Name must be at least {FIRST_NAME_MIN_LENGTH} characters long"
    )

    FIRST_NAME_MAX_LENGTH = 255
    FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE = (
        f"First Name cannot be longer than {FIRST_NAME_MAX_LENGTH} characters",
    )
    
    FIRST_NAME_ONLY_LETTERS_ERROR_MESSAGE = (
        "Please make sure your First Name contains only letters"
    )

    LAST_NAME_MIN_LENGTH = 2
    LAST_NAME_MIN_LENGTH_ERROR_MESSAGE = (
        f"Last Name must be at least {LAST_NAME_MIN_LENGTH} characters long"
    )
    
    LAST_NAME_MAX_LENGTH = 255
    LAST_NAME_MAX_LENGTH_ERROR_MESSAGE = (
        f"LAst Name cannot be longer than {LAST_NAME_MAX_LENGTH} characters",
    )
    
    LAST_NAME_ONLY_LETTERS_ERROR_MESSAGE = (
        "Please make sure your Last Name contains only letters"
    )

    PHONE_NUMBER_MIN_LENGTH = 7
    PHONE_NUMBER_MIN_LENGTH_ERROR_MESSAGE = (
        f"Phone Number must be at least {PHONE_NUMBER_MIN_LENGTH} digits long"
    )
    
    PHONE_NUMBER_MAX_LENGTH = 15
    PHONE_NUMBER_MAX_LENGTH_ERROR_MESSAGE = (
        f"Phone Number cannot be longer than {PHONE_NUMBER_MAX_LENGTH} digits"
    )

    COUNTRY_MIN_COUNTRY = 2
    COUNTRY_MAX_LENGTH = 255

    CITY_MIN_COUNTRY = 2
    CITY_MAX_LENGTH = 255

    STREET_MIN_COUNTRY = 8
    STREET_MAX_LENGTH = 255

    APARTMENT_MIN_COUNTRY = 0
    APARTMENT_MAX_LENGTH = 10

    POSTAL_CODE_MIN_COUNTRY = 4
    POSTAL_CODE_MAX_LENGTH = 15



    first_name = models.CharField(
        blank=True,
        validators=[
            RegexValidator(
                regex="^[A-Za-z]$",
                message=FIRST_NAME_ONLY_LETTERS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                FIRST_NAME_MIN_LENGTH,
                message=FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                FIRST_NAME_MAX_LENGTH,
                message=FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    last_name = models.CharField(
        blank=True,
        validators=[
            RegexValidator(
                regex="^[A-Za-z]$",
                message=LAST_NAME_ONLY_LETTERS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                LAST_NAME_MIN_LENGTH,
                message=LAST_NAME_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                LAST_NAME_MAX_LENGTH,
                message=LAST_NAME_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    phone_number = models.CharField(
        validators=[
            RegexValidator(
                regex=rf"^[0-9]{{{PHONE_NUMBER_MIN_LENGTH},{PHONE_NUMBER_MAX_LENGTH}}}$",
                message=f"This field requires ${PHONE_NUMBER_MIN_LENGTH}-${PHONE_NUMBER_MAX_LENGTH} digits",
            )
        ],
    )

    country = models.CharField()
    city = models.CharField()
    street = models.CharField()
    apartment = models.CharField()
    postal_code = models.CharField()

    user = models.OneToOneField(
        to="user_credential_details.UserCredentialDetails",
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="shipping_details",
    )

    def clean(self):
        for field, rules in CLEAN_RULES.items():
            value = getattr(self, field)

            if len(value) == 0:
                raise ValidationError({field: rules["error_message"]})

            if rules.get("capitalize", False):
                setattr(self, field, value.capitalize())


    def save(self, *args, **kwargs):
        self.clean()

        super().save(*args, **kwargs)
