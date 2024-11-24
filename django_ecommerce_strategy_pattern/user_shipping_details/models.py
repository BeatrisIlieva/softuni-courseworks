from django.db import models
from django.core.validators import RegexValidator

# from django_ecommerce_strategy_pattern.user_credential_details.models import (
#     UserCredentialDetails,
# )


class UserShippingDetails(models.Model):
    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MAX_LENGTH = 255
    
    first_name = models.CharField(
        validators=[
            RegexValidator(
                regex=rf"^[A-Za-z]{{{FIRST_NAME_MIN_LENGTH},{FIRST_NAME_MAX_LENGTH}}}$",
                message=f"This field requires ${FIRST_NAME_MIN_LENGTH}-${FIRST_NAME_MAX_LENGTH} letters"
            )
        ],
    )
    
    last_name = models.CharField()
    phone_number = models.CharField()
    country = models.CharField()
    city = models.CharField()
    street = models.CharField()
    apartment = models.CharField()
    postal_code = models.CharField()
    
    user = models.OneToOneField(
        to="user_credential_details.UserCredentialDetails", 
        # to=UserCredentialDetails,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="shipping_details",
    )

