from abc import ABC, abstractmethod

from django_ecommerce_strategy_pattern.product.models.product import Product

from django_ecommerce_strategy_pattern.product.models.color import Color

from django_ecommerce_strategy_pattern.product.models.category import Category

from django_ecommerce_strategy_pattern.product.strategies import (
    get_entity_details,
    FiltrationMethod,
)


class AbstractProductSetFactory(ABC):
    @abstractmethod
    def create_earring(self):
        pass

    @abstractmethod
    def create_bracelet(self):
        pass

    @abstractmethod
    def create_necklace(self):
        pass

    @abstractmethod
    def create_ring(self):
        pass

    @abstractmethod
    def generate_product_set(self):
        pass


class Earring:
    def __init__(self, color_pk: str) -> None:
        self.color_pk = color_pk
        self.category_pk = Category.objects.get(title="E").pk

    def get_product(self):
        return get_entity_details(
            self.category_pk, self.color_pk, FiltrationMethod.SHORT_DETAILS
        )
        
        
class Bracelet:
    def __init__(self, color_pk: str) -> None:
        self.color_pk = color_pk
        self.category_pk = Category.objects.get(title="B").pk

    def get_product(self):
        return get_entity_details(
            self.category_pk, self.color_pk, FiltrationMethod.SHORT_DETAILS
        )
        
        
class Necklace:
    def __init__(self, color_pk: str) -> None:
        self.color_pk = color_pk
        self.category_pk = Category.objects.get(title="N").pk

    def get_product(self):
        return get_entity_details(
            self.category_pk, self.color_pk, FiltrationMethod.SHORT_DETAILS
        )
        
class Ring:
    def __init__(self, color_pk: str) -> None:
        self.color_pk = color_pk
        self.category_pk = Category.objects.get(title="R").pk

    def get_product(self):
        return get_entity_details(
            self.category_pk, self.color_pk, FiltrationMethod.SHORT_DETAILS
        )


class PinkProductSetFactory(AbstractProductSetFactory):
    COLOR_PK = Color.objects.get(title="P").pk

    def create_earring(self):
        instance = Earring(PinkProductSetFactory.COLOR_PK)

        return instance.get_product()

    def create_bracelet(self):
        instance = Bracelet(PinkProductSetFactory.COLOR_PK)

        return instance.get_product()

    def create_necklace(self):
        instance = Necklace(PinkProductSetFactory.COLOR_PK)

        return instance.get_product()

    def create_ring(self):
        instance = Ring(PinkProductSetFactory.COLOR_PK)

        return instance.get_product()

    def generate_product_set(self):

        earring = self.create_earring()
        bracelet = self.create_bracelet()
        necklace = self.create_necklace()
        ring = self.create_ring()

        return [earring, bracelet, necklace, ring]
