from django.db import models


from django.core.validators import (
    RegexValidator,
)

from django_ecommerce_strategy_pattern.user_shipping_details.constants import (
    NAME_RULES,
    PHONE_NUMBER_RULES,
    STREET_RULES,
    APARTMENT_RULES,
)

from django_ecommerce_strategy_pattern.common.utils import create_char_field

from django.db import models


from django.core.validators import (
    MinLengthValidator,
    MaxLengthValidator,
    RegexValidator,
)


class UserShippingDetails(models.Model):

    POSTAL_CODE_MAX_LENGTH = 15
    POSTAL_CODE_MAX_LENGTH_ERROR_MESSAGE = (
        f"Postal Code cannot be longer than {POSTAL_CODE_MAX_LENGTH} characters"
    )

    first_name = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
        null_value=NAME_RULES.null,
        blank_value=NAME_RULES.blank,
    )

    last_name = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
        null_value=NAME_RULES.null,
        blank_value=NAME_RULES.blank,
    )

    phone_number = create_char_field(
        max_length=PHONE_NUMBER_RULES.max_length,
        min_length=PHONE_NUMBER_RULES.min_length,
        pattern=PHONE_NUMBER_RULES.pattern,
        pattern_error_message=PHONE_NUMBER_RULES.pattern_error_message,
        null_value=PHONE_NUMBER_RULES.null,
        blank_value=PHONE_NUMBER_RULES.blank,
    )

    country = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
        null_value=NAME_RULES.null,
        blank_value=NAME_RULES.blank,
    )

    city = create_char_field(
        max_length=NAME_RULES.max_length,
        min_length=NAME_RULES.min_length,
        pattern=NAME_RULES.pattern,
        pattern_error_message=NAME_RULES.pattern_error_message,
        null_value=NAME_RULES.null,
        blank_value=NAME_RULES.blank,
    )

    street = create_char_field(
        max_length=STREET_RULES.max_length,
        min_length=STREET_RULES.min_length,
        pattern=STREET_RULES.pattern,
        pattern_error_message=STREET_RULES.pattern_error_message,
        null_value=STREET_RULES.null,
        blank_value=STREET_RULES.blank,
    )

    apartment = create_char_field(
        max_length=APARTMENT_RULES.max_length,
        min_length=APARTMENT_RULES.min_length,
        pattern=APARTMENT_RULES.pattern,
        pattern_error_message=APARTMENT_RULES.pattern_error_message,
        null_value=APARTMENT_RULES.null,
        blank_value=APARTMENT_RULES.blank,
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
