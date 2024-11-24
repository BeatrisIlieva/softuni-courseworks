import os
import django

from django.db import models
from django.core.validators import RegexValidator

from django.db.models.signals import post_save
from django.dispatch import receiver

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "django_ecommerce_strategy_pattern.settings"
)
django.setup()

from django_ecommerce_strategy_pattern.user_credential_details.models import UserCredentialDetails
# from django_ecommerce_strategy_pattern.user_shipping_details.models import UserShippingDetails
# from django_ecommerce_strategy_pattern.user_payment_details.models import UserPaymentDetails





# from django_ecommerce_strategy_pattern.product.strategies import (
#     get_entity_details,
#     FiltrationMethod,
# )


# print(get_entity_details(2, 2, FiltrationMethod.FULL_DETAILS))

user_cr = UserCredentialDetails.objects.create(email="bea8@icloud.com")






