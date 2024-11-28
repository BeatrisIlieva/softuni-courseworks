import os
import django

from django.core.exceptions import ValidationError

from django.utils.timezone import now


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


from django_ecommerce_strategy_pattern.product.strategies import (
    get_entity_details,
    FiltrationMethod,
)


print(get_entity_details(2, 2, FiltrationMethod.FULL_DETAILS))

# try:
#     user_cr = UserCredentialDetails.objects.create(email="bea@icloud.com")
# except ValidationError as e:
#     print(e.messages[0])


# user_sp = UserShippingDetails.objects.get(pk=1)
# user_sp.first_name = "be"
# user_sp.last_name = "ilieva"
# user_sp.phone_number = "111111111"
# user_sp.country = "b b"
# user_sp.city = "Sofia-s"
# user_sp.street_address = "Some street"
# user_sp.apartment = ""
# user_sp.postal_code = "1 11"

# user_sp.full_clean()  
# user_sp.save()

# try:
#     user_sp.full_clean() 
#     user_sp.save()
# except ValidationError as e:
#      print(e.messages)


# user_cd = UserPaymentDetails.objects.get(pk=1)

# user_cd.card_holder = "bea ili"
# user_cd.card_number = "1234567890123456"
# user_cd.expiry_date = "12/24"
# user_cd.cvv_code = "125"

# user_cd.full_clean()  
# user_cd.save()

# try:
#     user_cd.full_clean() 
#     user_cd.save()
# except ValidationError as e:
#      print(e.messages)




# current_date = str(now().date())

# year, month, _ = current_date.split("-")
# print(year[-2:])



