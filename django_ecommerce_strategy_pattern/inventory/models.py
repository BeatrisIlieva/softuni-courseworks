from django.db import models
from django.core.validators import MaxValueValidator

from django_ecommerce_strategy_pattern.product.models.product import (
    Product,
)


class Inventory(models.Model):

    class Meta:
        unique_together = ("product", "size")

    quantity = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(
                3, message="The maximum quantity per product inventory is 3."
            ),
        ]
    )

    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="product_inventory",
    )

    size = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )

    @property
    def is_sold_out(self):
        return self.quantity <= 0
