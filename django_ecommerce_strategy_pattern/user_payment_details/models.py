from django.db import models


class UserPaymentDetails(models.Model):
    card_holder = models.CharField()

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
