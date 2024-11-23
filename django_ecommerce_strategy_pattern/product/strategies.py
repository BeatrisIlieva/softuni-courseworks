from abc import ABC, abstractmethod
from enum import Enum

from django_ecommerce_strategy_pattern.product.models import Product


class FiltrationMethod(Enum):

    SHORT_DETAILS = "short_details"
    FULL_DETAILS = "full_details"


class FiltrationStrategy(ABC):
    @abstractmethod
    def get_entity_details(self, category_by_color):
        pass


class ShortEntityDetails(FiltrationStrategy):
    def get_entity_details(self, category_pk, color_pk):
        return Product.objects.get_product_entity(category_pk, color_pk)


class FullEntityDetails(FiltrationStrategy):
    def get_entity_details(self, category_pk, color_pk):
        return Product.objects.get_product_entity(category_pk, color_pk)


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


print(get_entity_details(1, 2, FiltrationMethod.SHORT_DETAILS))
