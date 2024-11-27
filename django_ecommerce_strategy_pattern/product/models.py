from abc import ABC, abstractmethod

from decimal import Decimal

from django.db import models

from django_ecommerce_strategy_pattern.product.managers import ProductManager


class Color(models.Model):
    TITLE_CHOICES = (
        ("P", "Pink"),
        ("B", "Blue"),
        ("W", "White"),
    )

    title = models.CharField(
        max_length=10,
        choices=TITLE_CHOICES,
    )

    def __str__(self):
        return self.title


class ProductAbstractFactory(ABC):
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


class BaseProduct(models.Model):
    class Meta:
        abstract = True

    objects = ProductManager()

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    description = models.TextField(
        max_length=300,
    )

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
        related_name="color",
    )


class Earring(BaseProduct):
    drop_length = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )


class Bracelet(BaseProduct):
    wrist_size = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )


class Necklace(BaseProduct):
    neckline_length = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )


class Ring(BaseProduct):
    finger_circumference = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )


class PinkFactory(ProductAbstractFactory):
    COLOR = Color.objects.get(title="P")
    
    def create_earring(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
        drop_length: Decimal,
    ) -> Earring:

        return Earring.objects.create(
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            color=PinkFactory.COLOR,
            description=description,
            drop_length=drop_length,
        )

    def create_bracelet(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
        wrist_size: Decimal,
    ) -> Bracelet:

        return Bracelet.objects.create(
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            color=PinkFactory.COLOR,
            description=description,
            wrist_size=wrist_size,
        )

    def create_necklace(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
        neckline_length: Decimal,
    ) -> Necklace:

        return Necklace.objects.create(
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            color=PinkFactory.COLOR,
            description=description,
            neckline_length=neckline_length,
        )

    def create_ring(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
        finger_circumference: Decimal,
    ) -> Ring:

        return Ring.objects.create(
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            color=PinkFactory.COLOR,
            description=description,
            finger_circumference=finger_circumference,
        )
