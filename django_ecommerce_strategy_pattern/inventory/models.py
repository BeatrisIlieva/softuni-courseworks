from django.db import models

from django_ecommerce_strategy_pattern.product.models import Product


class Inventory(models.Model):
    class Meta:
        unique_together = ("product", "size", "price")

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )

    quantity = models.PositiveIntegerField()

    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="product",
    )
