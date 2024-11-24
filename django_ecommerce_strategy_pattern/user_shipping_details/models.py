from django.db import models
from django.core.validators import RegexValidator


class UserShippingDetails(models.Model):
    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MAX_LENGTH = 255
    
    LAST_NAME_MIN_LENGTH = 2
    LAST_NAME_MAX_LENGTH = 255
    
    PHONE_NUMBER_MIN_LENGTH = 7
    PHONE_NUMBER_MAX_LENGTH = 15
    
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
        max_length=(FIRST_NAME_MAX_LENGTH),
        validators=[
            RegexValidator(
                regex=rf"^[A-Za-z]{{{FIRST_NAME_MIN_LENGTH},{FIRST_NAME_MAX_LENGTH}}}$",
                message=f"This field requires ${FIRST_NAME_MIN_LENGTH}-${FIRST_NAME_MAX_LENGTH} letters",
            )
        ],
    )
    
    last_name = models.CharField(
        validators=[
            RegexValidator(
                regex=rf"^[A-Za-z]{{{LAST_NAME_MIN_LENGTH},{LAST_NAME_MAX_LENGTH}}}$",
                message=f"This field requires ${LAST_NAME_MIN_LENGTH}-${LAST_NAME_MAX_LENGTH} letters",
            )
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

    last_name = models.CharField()
    phone_number = models.CharField()
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
        self.first_name = self.first_name.capitalize()
        
    def save(self, *args, **kwargs):
        self.clean()
        
        super().save(*args, **kwargs)
