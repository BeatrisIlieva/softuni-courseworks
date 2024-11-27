from django.db import models

# from django_ecommerce_strategy_pattern.product.managers import ProductManager

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


class BaseProduct(models.Model):
    class Meta:
        abstract = True

    # objects = ProductManager()

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
    )

    first_image_url = models.ForeignKey(
        to=FirstImageUrl,
        on_delete=models.CASCADE,
    )

    second_image_url = models.ForeignKey(
        to=SecondImageUrl,
        on_delete=models.CASCADE,
    )

    description = models.ForeignKey(
        to=Description,
        on_delete=models.CASCADE,
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

    def __str__(self):
        return f"{self.color.get_title_display()} - {self.__class__.__name__}"


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

    def __str__(self):
        return f"{self.color.get_title_display()} - {self.__class__.__name__}"


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

    def __str__(self):
        return f"{self.color.get_title_display()} - {self.__class__.__name__}"


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

    def __str__(self):
        return f"{self.color.get_title_display()} - {self.__class__.__name__}"
