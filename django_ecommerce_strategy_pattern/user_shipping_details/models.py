from django.db import models

from django_ecommerce_strategy_pattern.user_credential_details.models import (
    UserCredentialDetails,
)


class UserShippingDetails(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()
    phone_number = models.CharField()
    country = models.CharField()
    city = models.CharField()
    street = models.CharField()
    apartment = models.CharField()
    postal_code = models.CharField()
    
    user = models.OneToOneField(
        to=UserCredentialDetails,
        on_delete=models.CASCADE,
        primary_key=True,
    )

