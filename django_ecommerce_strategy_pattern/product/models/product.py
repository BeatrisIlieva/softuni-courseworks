from django.db import models

from django_ecommerce_strategy_pattern.product.managers import (
    ProductManager,
)

from .color import (
    Color,
)

from .category import (
    Category,
)

from .description import (
    Description,
)


class Product(models.Model):

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

    def __str__(self):
        return f"{self.color.get_title_display()} - {self.category.get_title_display()}"
