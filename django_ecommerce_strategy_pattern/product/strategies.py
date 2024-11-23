from abc import ABC, abstractmethod
from enum import Enum

from django_ecommerce_strategy_pattern.product.models import Product


class CategoryEntity(Enum):
    EARRING_PINK = {"category_pk": 1, "color_pk": 1}
    EARRING_BLUE = {"category_pk": 1, "color_pk": 2}
    EARRING_WHITE = {"category_pk": 1, "color_pk": 3}

    BRACELET_PINK = {"category_pk": 2, "color_pk": 1}
    BRACELET_BLUE = {"category_pk": 2, "color_pk": 2}
    BRACELET_WHITE = {"category_pk": 2, "color_pk": 3}

    NECKLACE_PINK = {"category_pk": 3, "color_pk": 1}
    NECKLACE_BLUE = {"category_pk": 3, "color_pk": 2}
    NECKLACE_WHITE = {"category_pk": 3, "color_pk": 3}

    RING_PINK = {"category_pk": 4, "color_pk": 1}
    RING_BLUE = {"category_pk": 4, "color_pk": 2}
    RING_WHITE = {"category_pk": 4, "color_pk": 3}


class CategoryEntityStrategy(ABC):
    @abstractmethod
    def get_entity(self, category_by_color):
        pass


class EarringEntity(CategoryEntityStrategy):
    def get_entity(self, category_by_color):
        return Product.objects.get_product_entity(category_pk, color_pk)
        
