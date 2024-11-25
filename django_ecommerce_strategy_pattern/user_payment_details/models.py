from django.db import models

from django.core.validators import (
    RegexValidator,
    MinLengthValidator,
    MaxLengthValidator,
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

    card_holder = models.CharField(
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
        ]
    )

    card_number = models.CharField()

    expiry_date = models.DateField(
        null=True,
        blank=False,
    )

    cvv_code = models.CharField()

    user = models.OneToOneField(
        to="user_credential_details.UserCredentialDetails",
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="payment_details",
    )
