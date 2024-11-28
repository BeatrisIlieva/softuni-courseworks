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


class Earring:
    def __init__(self, color_pk: str) -> None:
        self.color_pk = color_pk
        self.category_pk = Category.objects.get(title="E").pk
        
    def get_product(self):
        return get_entity_details(self.category_pk, self.color_pk,  FiltrationMethod.SHORT_DETAILS)
        # return Product.objects.filter(category_id=self.category_pk, color_id=self.color_pk)
    
        
class PinkProductSetFactory(AbstractProductSetFactory):
    COLOR_PK = Color.objects.get(title="P").pk
    
    def create_earring(self):
        instance = Earring(PinkProductSetFactory.COLOR_PK)
        
        return instance.get_product()
    
    def create_bracelet(self):
        pass
    
    def create_necklace(self):
        pass
    
    def create_ring(self):
        pass