from abc import ABC, abstractmethod

from django.db import models

# from django_ecommerce_strategy_pattern.product.managers import ProductManager


class Color(models.Model):
    TITLE_CHOICES = (
        ("P", "Pink"),
        ("B", "Blue"),
        ("W", "White"),
    )

    title = models.CharField(
        max_length=1,
        choices=TITLE_CHOICES,
    )

    def __str__(self):
        return self.title


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


class BaseProduct(models.Model):
    class Meta:
        abstract = True

    # objects = ProductManager()

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    description = models.TextField(
        max_length=300,
    )

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
        # related_name="color",
    )


class Earring(BaseProduct):
    DROP_LENGTH_CHOICES = (
        ("S", 4.05),
        ("M", 4.98),
        ("L", 5.86),
    )

    drop_length = models.CharField(
        max_length=1,
        choices=DROP_LENGTH_CHOICES,
    )


class Bracelet(BaseProduct):
    WRIST_SIZE_CHOICES = (
        ("S", 15.02),
        ("M", 17.08),
        ("L", 19.03),
    )

    wrist_size = models.CharField(
        max_length=1,
        choices=WRIST_SIZE_CHOICES,
    )


class Necklace(BaseProduct):
    NECKLINE_CHOICES = (
        ("S", 40.64),
        ("M", 43.18),
        ("L", 45.72),
    )

    neckline_length = models.CharField(
        max_length=1,
        choices=NECKLINE_CHOICES,
    )


class Ring(BaseProduct):
    FINGER_CIRCUMFERENCE_CHOICES = (
        ("S", 4.07),
        ("M", 4.09),
        ("L", 5.05),
    )

    finger_circumference = models.CharField(
        max_length=1,
        choices=FINGER_CIRCUMFERENCE_CHOICES,
    )


class ProductFactory(AbstractProductFactory):
    def __init__(self, color: Color, size: str) -> None:
        self.color = color
        self.size = size

    def create_earring(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Earring:

        return Earring.objects.create(
            color=self.color,
            drop_length=self.size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )

    def create_bracelet(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Bracelet:

        return Bracelet.objects.create(
            color=self.color,
            wrist_size=self.size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )

    def create_necklace(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Necklace:

        return Necklace.objects.create(
            color=self.color,
            neckline_length=self.size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )

    def create_ring(
        self,
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Ring:

        return Ring.objects.create(
            color=self.color,
            finger_circumference=self.size,
            first_image_url=first_image_url,
            second_image_url=second_image_url,
            description=description,
        )
