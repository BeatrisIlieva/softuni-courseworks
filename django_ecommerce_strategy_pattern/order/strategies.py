from abc import ABC, abstractmethod
from enum import Enum
from decimal import Decimal

from django.core.exceptions import ValidationError

from django_ecommerce_strategy_pattern.shopping_bag.models import (
    ShoppingBag,
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
    def calculate_delivery_cost(self, user) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(30)

        if shopping_bag_total_price > Decimal(250_000):
            delivery_cost = Decimal(0)
        elif shopping_bag_total_price > Decimal(150_000):
            delivery_cost = Decimal(20)

        return delivery_cost

    def get_delivery_details(self, user) -> str:
        pass
        # delivery_instructions = input("Please enter any delivery instructions (e.g., leave at the door, etc.): ")
        # preferred_delivery_time = input("Preferred delivery time (e.g., morning, afternoon, etc.): ")


class RegularHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(20)

        if shopping_bag_total_price > Decimal(150_000):
            delivery_cost = Decimal(0)

        return delivery_cost

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
