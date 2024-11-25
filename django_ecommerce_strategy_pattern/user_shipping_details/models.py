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

from django_ecommerce_strategy_pattern.user_shipping_details.validators import Validator, ValidationMethod


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
        f"Last Name cannot be longer than {LAST_NAME_MAX_LENGTH} characters",
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

    PHONE_NUMBER_ONLY_DIGITS_ERROR_MESSAGE = (
        "Please make sure your Phone Number contains only digits"
    )

    COUNTRY_MIN_LENGTH = 2
    COUNTRY_MIN_LENGTH_ERROR_MESSAGE = (
        f"Country name must be at least {COUNTRY_MIN_LENGTH} characters long"
    )

    COUNTRY_MAX_LENGTH = 255
    COUNTRY_MAX_LENGTH_ERROR_MESSAGE = (
        f"Country name cannot be longer than {COUNTRY_MAX_LENGTH} characters",
    )

    COUNTRY_ONLY_LETTERS_ERROR_MESSAGE = (
        "Please make sure the Country name contains only letters"
    )

    CITY_MIN_LENGTH = 2
    CITY_MIN_LENGTH_ERROR_MESSAGE = (
        f"City name must be at least {CITY_MIN_LENGTH} characters long"
    )

    CITY_MAX_LENGTH = 255
    CITY_MAX_LENGTH_ERROR_MESSAGE = (
        f"City name cannot be longer than {CITY_MAX_LENGTH} characters",
    )

    CITY_ONLY_LETTERS_ERROR_MESSAGE = (
        "Please make sure the City name contains only letters"
    )

    STREET_MIN_LENGTH = 8
    STREET_MIN_LENGTH_ERROR_MESSAGE = (
        f"Street must be at least {STREET_MIN_LENGTH} characters long"
    )

    STREET_MAX_LENGTH = 255
    STREET_MAX_LENGTH_ERROR_MESSAGE = (
        f"Street cannot be longer than {STREET_MAX_LENGTH} characters",
    )

    APARTMENT_MIN_LENGTH = 0

    APARTMENT_MAX_LENGTH = 10
    APARTMENT_MAX_LENGTH_ERROR_MESSAGE = (
        f"Apartment cannot be longer than {APARTMENT_MAX_LENGTH} characters",
    )

    POSTAL_CODE_MIN_LENGTH = 4
    POSTAL_CODE_MIN_LENGTH_ERROR_MESSAGE = (
        f"Postal Code must be at least {POSTAL_CODE_MIN_LENGTH} characters long"
    )

    POSTAL_CODE_MAX_LENGTH = 15
    POSTAL_CODE_MAX_LENGTH_ERROR_MESSAGE = (
        f"Postal Code cannot be longer than {POSTAL_CODE_MAX_LENGTH} characters",
    )

    first_name = models.CharField(
        validators=[
            RegexValidator(
                regex="^[A-Za-z]$",
                message=FIRST_NAME_ONLY_LETTERS_ERROR_MESSAGE,
            ),
            
            Validator(
                length_limit=0,
                error_message="please enter your first name",
                method=ValidationMethod.ZERO_LENGTH,
            ),
            Validator(
                length_limit=FIRST_NAME_MIN_LENGTH,
                error_message=FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
                method=ValidationMethod.MIN_LENGTH,
            ),
            
            # MinLengthValidator(
            #     limit_value=FIRST_NAME_MIN_LENGTH,
            #     message=FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
            # ),
            MaxLengthValidator(
                limit_value=FIRST_NAME_MAX_LENGTH,
                message=FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    last_name = models.CharField(
        validators=[
            RegexValidator(
                regex="^[A-Za-z]$",
                message=LAST_NAME_ONLY_LETTERS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=LAST_NAME_MIN_LENGTH,
                message=LAST_NAME_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=LAST_NAME_MAX_LENGTH,
                message=LAST_NAME_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    phone_number = models.CharField(
        validators=[
            RegexValidator(
                regex=r"^[0-9]$",
                message=PHONE_NUMBER_ONLY_DIGITS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=PHONE_NUMBER_MIN_LENGTH,
                message=PHONE_NUMBER_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=PHONE_NUMBER_MAX_LENGTH,
                message=PHONE_NUMBER_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    country = models.CharField(
        validators=[
            RegexValidator(
                regex="^[A-Za-z]$",
                message=COUNTRY_ONLY_LETTERS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=COUNTRY_MIN_LENGTH,
                message=COUNTRY_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=COUNTRY_MAX_LENGTH,
                message=COUNTRY_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    city = models.CharField(
        validators=[
            RegexValidator(
                regex="^[A-Za-z]$",
                message=CITY_ONLY_LETTERS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=CITY_MIN_LENGTH,
                message=CITY_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=CITY_MAX_LENGTH,
                message=CITY_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    street = models.CharField(
        validators=[
            MinLengthValidator(
                limit_value=STREET_MIN_LENGTH,
                message=STREET_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=STREET_MAX_LENGTH,
                message=STREET_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    apartment = models.CharField(
        validators=[
            MaxLengthValidator(
                APARTMENT_MAX_LENGTH,
                message=APARTMENT_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )
    
    postal_code = models.CharField(
        validators=[
            MinLengthValidator(
                POSTAL_CODE_MIN_LENGTH,
                message=POSTAL_CODE_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                POSTAL_CODE_MAX_LENGTH,
                message=POSTAL_CODE_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    user = models.OneToOneField(
        to="user_credential_details.UserCredentialDetails",
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="shipping_details",
    )

    # def clean(self):
    #     for field, rules in CLEAN_RULES.items():
    #         value = getattr(self, field)

    #         if len(value) == 0:
    #             raise ValidationError({field: rules["error_message"]})

    #         # if rules.get("capitalize", False):
    #         #     setattr(self, field, value.capitalize())

    # def save(self, *args, **kwargs):
    #     # self.clean()

    #     super().save(*args, **kwargs)
