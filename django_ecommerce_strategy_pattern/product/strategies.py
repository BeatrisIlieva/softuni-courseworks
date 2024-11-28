"""
This module implements the Strategy Design Pattern to provide a flexible and scalable
approach for retrieving different levels of product details based on user preferences.
"""

from abc import ABC, abstractmethod
from enum import Enum

from .models import (
    Product,
)


class FiltrationMethod(Enum):
    """
    The FiltrationMethod Enum defines the available filtration strategies.
    """

    SHORT_DETAILS = "short_details"
    FULL_DETAILS = "full_details"


class FiltrationStrategy(ABC):
    """
    The FiltrationStrategy interface declares a method for fetching entity details.

    The Context uses this interface to call the algorithm defined by Concrete
    Strategies.
    """

    @abstractmethod
    def get_entity_details(self, category_pk, color_pk):
        pass


"""
Concrete Strategies implementing the algorithm while following the base Strategy
interface. The interface makes them interchangeable in the Context.
"""


class ShortEntityDetails(FiltrationStrategy):
    def get_entity_details(self, category_pk, color_pk):
        entity = Product.objects.get_product_entity_short_details(category_pk, color_pk)

        result = []

        for data in entity:
            result.append(f"Product: {data}")
            result.append(f"Category: {data.category.get_title_display()}")
            result.append(f"Color: {data.color.get_title_display()}")
            result.append(f"First Image: {data.first_image_url}")
            result.append(f"Second Image: {data.second_image_url}")

            result.append(f"Price Range: {data.min_price} - {data.max_price}")

            for inventory in data.product_inventory.all():
                result.append(f"  Inventory Quantity: {inventory.quantity}")
                result.append(f"  Price Amount: {inventory.price}")
                result.append(
                    f"  Is Sold Out: {'Yes' if inventory.is_sold_out else 'No'}"
                )

        return "\n".join(result)


class FullEntityDetails(FiltrationStrategy):
    def get_entity_details(self, category_pk, color_pk):
        entity = Product.objects.get_product_entity_full_details(category_pk, color_pk)

        result = []

        for data in entity:
            result.append(f"Product: {data}")
            result.append(f"Category: {data.category.get_title_display()}")
            result.append(f"Color: {data.color.get_title_display()}")
            result.append(f"First Image: {data.first_image_url}")
            result.append(f"Second Image: {data.second_image_url}")
            result.append(f"Description: {data.description.content}")

            for inventory in data.product_inventory.all():
                result.append(f"Size Measurement: {inventory.size}")
                result.append(f"Inventory Quantity: {inventory.quantity}")
                result.append(f"Size Measurement: {inventory.size}")
                result.append(f"Price Amount: {inventory.price}")
                result.append(
                    f"Is Sold Out: {'Yes' if inventory.is_sold_out else 'No'}"
                )

        return "\n".join(result)


class FiltrationContext:
    """
    The Context maintains a reference to one of the Strategy objects.
    """

    def __init__(self, strategy: FiltrationStrategy):
        """
        Initialize the context with a specific filtration strategy.
        """
        self._strategy = strategy

    @property
    def strategy(self) -> FiltrationStrategy:
        """
        Get the current strategy.
        """
        return self._strategy

    @strategy.setter
    def strategy(self, strategy: FiltrationStrategy) -> None:
        """
        Set a new filtration strategy.
        """

        self._strategy = strategy

    def get_entity_details(self, category_pk, color_pk):
        """
        Delegates the fetching of product details to the strategy.
        """
        return self._strategy.get_entity_details(category_pk, color_pk)


def get_entity_details(category_pk, color_pk, method: FiltrationMethod):
    """
    Factory function to fetch product details based on the selected filtration method.
    """

    strategies = {
        FiltrationMethod.SHORT_DETAILS: ShortEntityDetails(),
        FiltrationMethod.FULL_DETAILS: FullEntityDetails(),
    }

    context = FiltrationContext(strategy=strategies[method])
    return context.get_entity_details(category_pk, color_pk)
