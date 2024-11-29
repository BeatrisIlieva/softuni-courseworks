from abc import ABC, abstractmethod
from enum import Enum
from decimal import Decimal
from datetime import timedelta

from django.utils.timezone import now


from django_ecommerce_strategy_pattern.shopping_bag.models import (
    ShoppingBag,
)


class DeliveryMethod(Enum):
    STORE_PICKUP = "Store Pickup"
    EXPRESS_HOME = "Express Home Delivery"
    REGULAR_HOME = "Regular Home Delivery"


class DeliveryStrategy(ABC):
    @abstractmethod
    def calculate_delivery_cost(self, user=None) -> float:
        pass

    @abstractmethod
    def calculate_delivery_due_date(self) -> str:
        pass


class StorePickupStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user=None) -> float:
        return Decimal(0)

    def calculate_delivery_due_date(self) -> str:
        return now().date()


class ExpressHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user=None) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(30)

        if shopping_bag_total_price > Decimal(250_000):
            delivery_cost = Decimal(0)
        elif shopping_bag_total_price > Decimal(150_000):
            delivery_cost = Decimal(20)

        return delivery_cost

    def calculate_delivery_due_date(self) -> str:
        return now().date() + timedelta(days=1)


class RegularHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user=None) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(10)

        if shopping_bag_total_price > Decimal(150_000):
            delivery_cost = Decimal(0)

        return delivery_cost

    def calculate_delivery_due_date(self) -> str:
        return now().date() + timedelta(days=7)


class DeliveryContext:
    def __init__(self, strategy: DeliveryStrategy) -> None:
        self.strategy = strategy

    def get_delivery_details(self, user=None):
        cost = self.strategy.calculate_delivery_cost(user)
        details = self.strategy.calculate_delivery_due_date()

        return {"delivery_cost": cost, "shipping_details": details}


def execute_context(method, user=None):
    strategies = {
        DeliveryMethod.STORE_PICKUP: StorePickupStrategy(),
        DeliveryMethod.EXPRESS_HOME: ExpressHomeDeliveryStrategy(),
        DeliveryMethod.REGULAR_HOME: RegularHomeDeliveryStrategy(),
    }

    context = DeliveryContext(strategy=strategies[method])
    return context.get_delivery_details(user)
