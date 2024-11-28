from abc import ABC, abstractmethod
from enum import Enum

from django_ecommerce_strategy_pattern.product.models.product import (
    Product,
)


class FiltrationMethod(Enum):

    SHORT_DETAILS = "short_details"
    FULL_DETAILS = "full_details"


class FiltrationStrategy(ABC):
    @abstractmethod
    def get_entity_details(self, category_pk, color_pk):
        pass


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
                result.append(
                    f"Size Measurement: {inventory.size}"
                )
                result.append(f"Inventory Quantity: {inventory.quantity}")
                result.append(
                    f"Size Measurement: {inventory.size}"
                )
                result.append(f"Price Amount: {inventory.price}")
                result.append(
                    f"Is Sold Out: {'Yes' if inventory.is_sold_out else 'No'}"
                )

        return "\n".join(result)


class FiltrationContext:
    def __init__(self, strategy: FiltrationStrategy):
        self.strategy = strategy

    def get_entity_details(self, category_pk, color_pk):
        return self.strategy.get_entity_details(category_pk, color_pk)


def get_entity_details(category_pk, color_pk, method):
    strategies = {
        FiltrationMethod.SHORT_DETAILS: ShortEntityDetails(),
        FiltrationMethod.FULL_DETAILS: FullEntityDetails(),
    }

    context = FiltrationContext(strategy=strategies[method])
    return context.get_entity_details(category_pk, color_pk)
