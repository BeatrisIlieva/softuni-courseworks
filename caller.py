import os
import django

from django.core.exceptions import ValidationError


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "django_ecommerce_strategy_pattern.settings"
)
django.setup()

from django_ecommerce_strategy_pattern.user_credential_details.models import (
    UserCredentialDetails,
)

from django_ecommerce_strategy_pattern.user_shipping_details.models import (
    UserShippingDetails,
)

# from django_ecommerce_strategy_pattern.user_payment_details.models import UserPaymentDetails


# from django_ecommerce_strategy_pattern.product.strategies import (
#     get_entity_details,
#     FiltrationMethod,
# )


# print(get_entity_details(2, 2, FiltrationMethod.FULL_DETAILS))
# try:
#     user_cr = UserCredentialDetails.objects.create(email="bea8@icloud.com")
# except ValidationError as e:
#     print(e.messages[0])


user_sp = UserShippingDetails.objects.get(pk=9)
user_sp.first_name = "b1"
user_sp.last_name = "ilieve"
user_sp.phone_number = "00000000000"
user_sp.country = "B"
user_sp.city = "B"
user_sp.street = "B"
user_sp.apartment = "A"
user_sp.postal_code = "1"

user_sp.full_clean()  
user_sp.save()
