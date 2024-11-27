from abc import ABC, abstractmethod

from django_ecommerce_strategy_pattern.product.models.color import (
    Color,
)

from django_ecommerce_strategy_pattern.product.models.image_url import (
    FirstImageUrl,
    SecondImageUrl,
)

from django_ecommerce_strategy_pattern.product.models.description import (
    Description,
)

from django_ecommerce_strategy_pattern.product.models.product import (
    Earring,
    Bracelet,
    Necklace,
    Ring,
)


class AbstractProductFactory(ABC):
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


class ProductFactory(AbstractProductFactory):
    def __init__(self, color: Color) -> None:
        self.color = color

    def create_earring(
        self,
        first_image_url: FirstImageUrl,
        second_image_url: SecondImageUrl,
        description: Description,
        size: str,
    ) -> Earring:

        return Earring.objects.create(
            color=self.color,
            drop_length=size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )

    def create_bracelet(
        self,
        first_image_url: FirstImageUrl,
        second_image_url: SecondImageUrl,
        description: Description,
        size: str,
    ) -> Bracelet:

        return Bracelet.objects.create(
            color=self.color,
            wrist_size=size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )

    def create_necklace(
        self,
        first_image_url: FirstImageUrl,
        second_image_url: SecondImageUrl,
        description: Description,
        size: str,
    ) -> Necklace:

        return Necklace.objects.create(
            color=self.color,
            neckline_length=size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )

    def create_ring(
        self,
        first_image_url: FirstImageUrl,
        second_image_url: SecondImageUrl,
        description: Description,
        size: str,
    ) -> Ring:

        return Ring.objects.create(
            color=self.color,
            finger_circumference=size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )
