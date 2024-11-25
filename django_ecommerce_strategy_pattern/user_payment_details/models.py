from django.db import models

from django.core.validators import (
    RegexValidator,
    MinLengthValidator,
    MaxLengthValidator,
)

from django_ecommerce_strategy_pattern.user_payment_details.validators import (
    validate_card_expiry_date,
)


class UserPaymentDetails(models.Model):
    CARD_HOLDER_EMPTY_ERROR_MESSAGE = "Please enter your First Name"

    CARD_HOLDER_MIN_LENGTH = 5
    CARD_HOLDER_MIN_LENGTH_ERROR_MESSAGE = (
        f"Card Holder name must be at least {CARD_HOLDER_MIN_LENGTH} characters long"
    )

    CARD_HOLDER_MAX_LENGTH = 36
    CARD_HOLDER_MAX_LENGTH_ERROR_MESSAGE = (
        f"Card Holder name cannot be longer than {CARD_HOLDER_MAX_LENGTH} characters",
    )

    CARD_HOLDER_FORMAT_ERROR_MESSAGE = "Card Holder must be in the format 'John Doe'"

    CARD_NUMBER_EMPTY_ERROR_MESSAGE = "Please enter a valid Card Number"

    CARD_NUMBER_LENGTH = 16
    CARD_NUMBER_LENGTH_ERROR_MESSAGE = (
        f"Card Number must be exactly {CARD_NUMBER_LENGTH} digits long"
    )

    CARD_NUMBER_ONLY_DIGITS_ERROR_MESSAGE = (
        "Please make sure your Card Number contains only digits"
    )

    CVV_CODE_EMPTY_ERROR_MESSAGE = "Please enter a CVV Code"

    CVV_CODE_LENGTH = 3
    CVV_CODE_LENGTH_ERROR_MESSAGE = (
        f"CVV Code must be exactly {CVV_CODE_LENGTH} digits long"
    )

    CVV_CODE_ONLY_DIGITS_ERROR_MESSAGE = (
        "Please make sure the CVV Code contains only digits"
    )

    card_holder = models.CharField(
        error_messages={
            "blank": CARD_HOLDER_EMPTY_ERROR_MESSAGE,
        },
        validators=[
            RegexValidator(
                regex="^[A-Z][a-z]+ [A-Z][a-z]+$",
                message=CARD_HOLDER_FORMAT_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=CARD_HOLDER_MIN_LENGTH,
                message=CARD_HOLDER_MIN_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=CARD_HOLDER_MAX_LENGTH,
                message=CARD_HOLDER_MAX_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    card_number = models.CharField(
        error_messages={
            "blank": CARD_NUMBER_EMPTY_ERROR_MESSAGE,
        },
        validators=[
            RegexValidator(
                regex="^\d+$",
                message=CARD_NUMBER_ONLY_DIGITS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=CARD_NUMBER_LENGTH,
                message=CARD_NUMBER_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=CARD_NUMBER_LENGTH,
                message=CARD_NUMBER_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    expiry_date = models.DateField(
        null=True,
        blank=False,
        validators=[
            validate_card_expiry_date,
        ],
    )

    cvv_code = models.CharField(
        error_messages={
            "blank": CVV_CODE_EMPTY_ERROR_MESSAGE,
        },
        validators=[
            RegexValidator(
                regex="^\d+$",
                message=CVV_CODE_ONLY_DIGITS_ERROR_MESSAGE,
            ),
            MinLengthValidator(
                limit_value=CVV_CODE_LENGTH,
                message=CVV_CODE_LENGTH_ERROR_MESSAGE,
            ),
            MaxLengthValidator(
                limit_value=CVV_CODE_LENGTH,
                message=CVV_CODE_LENGTH_ERROR_MESSAGE,
            ),
        ],
    )

    user = models.OneToOneField(
        to="user_credential_details.UserCredentialDetails",
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="payment_details",
    )
