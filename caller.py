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

from django_ecommerce_strategy_pattern.user_payment_details.models import UserPaymentDetails

# from django_ecommerce_strategy_pattern.user_payment_details.models import UserPaymentDetails


# from django_ecommerce_strategy_pattern.product.strategies import (
#     get_entity_details,
#     FiltrationMethod,
# )


# print(get_entity_details(2, 2, FiltrationMethod.FULL_DETAILS))

# try:
#     user_cr = UserCredentialDetails.objects.create(email="bea15@icloud.com")
# except ValidationError as e:
#     print(e.messages[0])


user_sp = UserShippingDetails.objects.get(pk=15)
user_sp.first_name = "b1"
user_sp.last_name = "ilieva"
user_sp.phone_number = "00000000000"
user_sp.country = "Bulgaria"
user_sp.city = "Sofia"
user_sp.street = "Some street"
user_sp.apartment = ""
user_sp.postal_code = "2000"

# user_cd = UserPaymentDetails.objects.get(pk=15)

# user_cd.card_holder = "  "
# user_cd.card_number = "1234567890123456"
# user_cd.expiry_date = "2024-11-25"
# user_cd.cvv_code = "123"

user_sp.full_clean()  
user_sp.save()

# try:
#     user_sp.full_clean() 
#     user_sp.save()
# except ValidationError as e:
#      print(e.messages)
