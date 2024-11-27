from abc import ABC, abstractmethod

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


class Description(models.Model):
    content = models.TextField(
        max_length=300,
    )


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


class Product(models.Model):
    class Meta:
        unique_together = ("category", "color")

    objects = ProductManager()

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name="category",
    )

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
        related_name="color",
    )

    description = models.ForeignKey(
        to=Description,
        on_delete=models.CASCADE,
        related_name="description",
    )
