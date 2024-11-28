from abc import ABC, abstractmethod
from enum import Enum


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

    def get_delivery_details(self) -> str:
        return "Pickup from the nearest store location."


class ExpressHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self) -> float:
        return 20.0

    def get_delivery_details(self) -> str:
        return "Express home delivery within 24 hours."


class RegularHomeDeliveryStrategy(DeliveryStrategy):
    def calculate_delivery_cost(self) -> float:
        return 10.0

    def get_delivery_details(self) -> str:
        return "Regular home delivery within 3-5 business days."
