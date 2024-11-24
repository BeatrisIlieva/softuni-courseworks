from django.db import models

from django_ecommerce_strategy_pattern.user_credential_details.models import (
    UserCredentialDetails,
)


class UserPaymentDetails(models.Model):
    card_holder = models.CharField()

    card_number = models.CharField()

    expiry_date = models.DateField()

    cvv_code = models.CharField()

    user = models.OneToOneField(
        to=UserCredentialDetails,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="payment_details",
    )
