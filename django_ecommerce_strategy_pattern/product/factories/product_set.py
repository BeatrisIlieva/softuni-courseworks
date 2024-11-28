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

class ProductMixin:
    def __init__(self, color_pk: int, category_title: str) -> None:
        self.color_pk = color_pk
        self.category_pk = Category.objects.get(title=category_title).pk

    
    def get_product(self):
        """
        Fetch product details using the shared logic for all product types.
        """
        return get_entity_details(self.category_pk, self.color_pk, FiltrationMethod.SHORT_DETAILS)

class Earring(ProductMixin):
    CATEGORY_TITLE = "E"
    
    def __init__(self, color_pk: str) -> None:
        super().__init__(color_pk, Earring.CATEGORY_TITLE)
        
        
class Bracelet(ProductMixin):
    CATEGORY_TITLE = "B"
    
    def __init__(self, color_pk: str) -> None:
        super().__init__(color_pk, Bracelet.CATEGORY_TITLE)
        
        
class Necklace(ProductMixin):
    CATEGORY_TITLE = "N"
    
    def __init__(self, color_pk: str) -> None:
        super().__init__(color_pk, Necklace.CATEGORY_TITLE)
        
class Ring(ProductMixin):
    CATEGORY_TITLE = "R"
    
    def __init__(self, color_pk: str) -> None:
        super().__init__(color_pk, Ring.CATEGORY_TITLE)


class PinkProductSetFactory(AbstractProductSetFactory):
    COLOR_PK = Color.objects.get(title="P").pk

    def create_earring(self):
        return Earring(PinkProductSetFactory.COLOR_PK).get_product()

    def create_bracelet(self):
        return Bracelet(PinkProductSetFactory.COLOR_PK).get_product()

    def create_necklace(self):
        return Necklace(PinkProductSetFactory.COLOR_PK).get_product()

    def create_ring(self):
        return Ring(PinkProductSetFactory.COLOR_PK).get_product()

    def generate_product_set(self):
        earring = self.create_earring()
        bracelet = self.create_bracelet()
        necklace = self.create_necklace()
        ring = self.create_ring()
        return [earring, bracelet, necklace, ring]


class BlueProductSetFactory(AbstractProductSetFactory):
    COLOR_PK = Color.objects.get(title="B").pk

    def create_earring(self):
        return Earring(BlueProductSetFactory.COLOR_PK).get_product()

    def create_bracelet(self):
        return Bracelet(BlueProductSetFactory.COLOR_PK).get_product()

    def create_necklace(self):
        return Necklace(BlueProductSetFactory.COLOR_PK).get_product()

    def create_ring(self):
        return Ring(BlueProductSetFactory.COLOR_PK).get_product()

    def generate_product_set(self):
        earring = self.create_earring()
        bracelet = self.create_bracelet()
        necklace = self.create_necklace()
        ring = self.create_ring()
        return [earring, bracelet, necklace, ring]
    

class WhiteProductSetFactory(AbstractProductSetFactory):
    COLOR_PK = Color.objects.get(title="W").pk

    def create_earring(self):
        return Earring(WhiteProductSetFactory.COLOR_PK).get_product()

    def create_bracelet(self):
        return Bracelet(WhiteProductSetFactory.COLOR_PK).get_product()

    def create_necklace(self):
        return Necklace(WhiteProductSetFactory.COLOR_PK).get_product()

    def create_ring(self):
        return Ring(WhiteProductSetFactory.COLOR_PK).get_product()

    def generate_product_set(self):
        earring = self.create_earring()
        bracelet = self.create_bracelet()
        necklace = self.create_necklace()
        ring = self.create_ring()
        return [earring, bracelet, necklace, ring]