from abc import ABC, abstractmethod
from enum import Enum

from django.core.exceptions import ValidationError

from django_ecommerce_strategy_pattern.user_shipping_details.models import (
    UserShippingDetails,
)


class DeliveryMethod(Enum):
    STORE_PICKUP = "Store Pickup"
    EXPRESS_HOME = "Express Home Delivery"
    REGULAR_HOME = "Regular Home Delivery"


class DeliveryStrategy(ABC):
    @abstractmethod
    def calculate_delivery_cost(self) -> float:
        pass

    @abstractmethod
    def get_delivery_details(self) -> str:
        pass


class StorePickupStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self) -> float:
        return 0.0

    def get_delivery_details(self, user) -> str:
        return "Pickup from the nearest store location."


class ExpressHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self) -> float:
        return 20.0

    def get_delivery_details(self, user) -> str:
        user_pk = user.pk
        user_sd = UserShippingDetails.objects.get(user_id=user_pk)
        
        print("Please enter any delivery instructions")
        user_sd.first_name = input("First Name*: ")
        user_sd.last_name = input("Last Name*: ")
        user_sd.phone_number = input("Phone Number*: ")
        user_sd.country = input("Country*: ")
        user_sd.city = input("City*: ")
        user_sd.street_address = input("Street Address*: ")
        user_sd.apartment = input("Apartment: ")
        user_sd.postal_code = input("Postal Code*: ")

        try:
            user_sd.full_clean()
            user_sd.save()
        except ValidationError as e:
            print(e.messages)

        # delivery_instructions = input("Please enter any delivery instructions (e.g., leave at the door, etc.): ")
        # preferred_delivery_time = input("Preferred delivery time (e.g., morning, afternoon, etc.): ")


class RegularHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self) -> float:
        return 10.0

    def get_delivery_details(self, user) -> str:
        return "Regular home delivery within 3-5 business days."


class DeliveryContext:
    def __init__(self, strategy: DeliveryStrategy) -> None:
        self.strategy = strategy

    def set_delivery_method(self, user):
        cost = self.strategy.calculate_delivery_cost()
        details = self.strategy.get_delivery_details(user)

        return {"delivery_cost": cost, "shipping_details": details}


def execute_setting_delivery_method(method, user):
    strategies = {
        DeliveryMethod.STORE_PICKUP: StorePickupStrategy(),
        DeliveryMethod.EXPRESS_HOME: ExpressHomeDeliveryStrategy(),
        DeliveryMethod.REGULAR_HOME: RegularHomeDeliveryStrategy(),
    }

    context = DeliveryContext(strategy=strategies[method])
    return context.set_delivery_method(user)
