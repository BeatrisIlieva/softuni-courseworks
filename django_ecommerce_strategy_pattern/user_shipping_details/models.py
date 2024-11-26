from django.db import models


from django.core.validators import (
    RegexValidator,
)

from django_ecommerce_strategy_pattern.user_shipping_details.constants import (
    NAME_RULES,
    PHONE_NUMBER_RULES,
)

from django_ecommerce_strategy_pattern.common.utils import create_char_field

from django.db import models


from django.core.validators import (
    MinLengthValidator,
    MaxLengthValidator,
    RegexValidator,
)


class UserShippingDetails(models.Model):

    STREET_EMPTY_ERROR_MESSAGE = "Please enter your Street"

    STREET_MIN_LENGTH = 8
    STREET_MIN_LENGTH_ERROR_MESSAGE = (
        f"Street must be at least {STREET_MIN_LENGTH} characters long"
    )

    STREET_MAX_LENGTH = 255
    STREET_MAX_LENGTH_ERROR_MESSAGE = (
        f"Street cannot be longer than {STREET_MAX_LENGTH} characters"
    )

    APARTMENT_MIN_LENGTH = 0

    APARTMENT_MAX_LENGTH = 10
    APARTMENT_MAX_LENGTH_ERROR_MESSAGE = (
        f"Apartment cannot be longer than {APARTMENT_MAX_LENGTH} characters"
    )

    POSTAL_CODE_EMPTY_ERROR_MESSAGE = "Please enter your Postal Code"

    POSTAL_CODE_MIN_LENGTH = 4
    POSTAL_CODE_MIN_LENGTH_ERROR_MESSAGE = (
        f"Postal Code must be at least {POSTAL_CODE_MIN_LENGTH} characters long"
    )

    POSTAL_CODE_MAX_LENGTH = 15
    POSTAL_CODE_MAX_LENGTH_ERROR_MESSAGE = (
        f"Postal Code cannot be longer than {POSTAL_CODE_MAX_LENGTH} characters"
    )

    first_name = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
    )

    last_name = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
    )

    phone_number = create_char_field(
        max_length=PHONE_NUMBER_RULES.max_length,
        min_length=PHONE_NUMBER_RULES.min_length,
        pattern=PHONE_NUMBER_RULES.pattern,
        pattern_error_message=PHONE_NUMBER_RULES.pattern_error_message,
    )

    country = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
    )

    city = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
    )

    street = models.CharField(
        error_messages={
            "blank": STREET_EMPTY_ERROR_MESSAGE,
        },
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
        null=True,
        blank=True,
        validators=[
            MaxLengthValidator(
                APARTMENT_MAX_LENGTH,
                message=APARTMENT_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    postal_code = models.CharField(
        error_messages={
            "blank": POSTAL_CODE_EMPTY_ERROR_MESSAGE,
        },
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
