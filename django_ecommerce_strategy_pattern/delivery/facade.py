from django.core.exceptions import ValidationError

from django_ecommerce_strategy_pattern.user_shipping_details.models import (
    UserShippingDetails,
)

from .strategies import (
    execute_context,
)


class UpdateDeliveryAddress:
    def get_user_details(self, user):
        user_pk = user.pk
        user_sd = UserShippingDetails.objects.get(user_id=user_pk)

        print("Please enter your delivery instructions")
        user_sd.first_name = input("First Name*: ")
        user_sd.last_name = input("Last Name*: ")
        user_sd.phone_number = input("Phone Number*: ")
        user_sd.country = input("Country*: ")
        user_sd.city = input("City*: ")
        user_sd.street_address = input("Street Address*: ")
        user_sd.apartment = input("Apartment: ")
        user_sd.postal_code = input("Postal Code*: ")

        return self.__save_user_details(user_sd)

    def __save_user_details(self, user_sd):
        try:
            user_sd.full_clean()
            user_sd.save()

            return "Shipping Details saved successfully"

        except ValidationError as e:
            return e.messages


class SetDeliveryMethod:
    def get_user_preferred_delivery_method(user, method):
        return execute_context(user, method)


class Facade:
    def __init__(
        self,
        update_delivery_address: UpdateDeliveryAddress,
        set_delivery_method: SetDeliveryMethod,
    ):
        self._update_delivery_address = update_delivery_address
        self._set_delivery_method = set_delivery_method

    def operation(self, user=None):
        result = []
        
        result.append(self._update_delivery_address.get_user_details(user))
        result.append(self._set_delivery_method())

        return "\n".join(result)
    
def client_code(facade: Facade, user=None):
    return facade.operation(user)


