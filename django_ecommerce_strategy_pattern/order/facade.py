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

            return True

        except ValidationError as e:
            print(e.messages)


class SetDeliveryMethod:
    def get_user_preferred_delivery_method(user, method):
        return execute_context(user, method)


class Facade:
    def __init__(
        self,
        update_delivery_address: UpdateDeliveryAddress,
        set_delivery_method: SetDeliveryMethod,
        execute_payment,
        create_order,
        delete_shopping_bag,
        send_confirmation_email,
    ):
        self._update_delivery_address = update_delivery_address
        self._set_delivery_method = set_delivery_method
        self._execute_payment = execute_payment
        self._create_order = create_order
        self._delete_shopping_bag = delete_shopping_bag
        self._send_confirmation_email = send_confirmation_email

    def operation(self):
        has_provided_delivery_details = self._update_delivery_address.get_user_details()
        has_selected_delivery_method = self._set_delivery_method()
        has_successfully_processed_payment = self._execute_payment()

        if (
            has_provided_delivery_details
            and has_selected_delivery_method
            and has_successfully_processed_payment
        ):
            self._create_order()
            self._delete_shopping_bag()
            self._send_confirmation_email()

        return None
