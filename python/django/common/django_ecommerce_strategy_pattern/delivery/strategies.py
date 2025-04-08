from abc import ABC, abstractmethod
from enum import Enum
from decimal import Decimal
from datetime import timedelta

from django.utils.timezone import now

from django.core.exceptions import ValidationError

from django_ecommerce_strategy_pattern.shopping_bag.models import (
    ShoppingBag,
)

from .models import (
    Delivery,
)

from django_ecommerce_strategy_pattern.user_shipping_details.models import (UserShippingDetails,)


class DeliveryMethod(Enum):
    STORE_PICKUP = "Store Pickup"
    EXPRESS_HOME = "Express Home Delivery"
    REGULAR_HOME = "Regular Home Delivery"


class DeliveryStrategy(ABC):
    @abstractmethod
    def calculate_delivery_cost(self, user) -> float:
        pass

    @abstractmethod
    def calculate_delivery_due_date(self) -> str:
        pass

    @abstractmethod
    def get_method_choice_name(self) -> str:
        pass


class StorePickupStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(0)

        total_cost = shopping_bag_total_price + delivery_cost

        return {"delivery_cost": delivery_cost, "total_cost": total_cost}

    def calculate_delivery_due_date(self) -> str:
        return now().date()

    def get_method_choice_name(self) -> str:
        return "SP"


class ExpressHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(30)

        if shopping_bag_total_price > Decimal(250_000):
            delivery_cost = Decimal(0)
        elif shopping_bag_total_price > Decimal(150_000):
            delivery_cost = Decimal(20)

        total_cost = shopping_bag_total_price + delivery_cost

        return {"delivery_cost": delivery_cost, "total_cost": total_cost}

    def calculate_delivery_due_date(self) -> str:
        return now().date() + timedelta(days=1)

    def get_method_choice_name(self) -> str:
        return "EH"


class RegularHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self, user) -> float:
        shopping_bag_total_price = ShoppingBag.objects.calculate_total_price(user)

        delivery_cost = Decimal(10)

        if shopping_bag_total_price > Decimal(150_000):
            delivery_cost = Decimal(0)

        total_cost = shopping_bag_total_price + delivery_cost

        return {"delivery_cost": delivery_cost, "total_cost": total_cost}

    def calculate_delivery_due_date(self) -> str:
        return now().date() + timedelta(days=7)

    def get_method_choice_name(self) -> str:
        return "RH"


class DeliveryContext:
    def __init__(self, strategy: DeliveryStrategy) -> None:
        self.strategy = strategy

    def get_delivery_details(self, user):

        price_details = self.strategy.calculate_delivery_cost(user)
        delivery_cost = price_details["delivery_cost"]
        total_cost = price_details["total_cost"]
        due_date = self.strategy.calculate_delivery_due_date()
        method_choice = self.strategy.get_method_choice_name()

        return self.__save_delivery_details(
            delivery_cost, total_cost, due_date, method_choice, user
        )

    def __save_delivery_details(
        self, delivery_cost, total_cost, due_date, method_choice, user
    ):
        try:
            user_shipping_details = UserShippingDetails.objects.get(pk=user.pk)
            
            Delivery.objects.create(
                delivery_method=method_choice,
                delivery_cost=delivery_cost,
                total_cost=total_cost,
                due_date=due_date,
                status="PE",
                user=user_shipping_details,
            )

            return f"Delivery Details saved successfully. Total Cost: ${total_cost}"

        except ValidationError as e:
            return e.messages


def execute_context(user, method):
    strategies = {
        DeliveryMethod.STORE_PICKUP: StorePickupStrategy(),
        DeliveryMethod.EXPRESS_HOME: ExpressHomeDeliveryStrategy(),
        DeliveryMethod.REGULAR_HOME: RegularHomeDeliveryStrategy(),
    }

    context = DeliveryContext(strategy=strategies[method])
    return context.get_delivery_details(user)
