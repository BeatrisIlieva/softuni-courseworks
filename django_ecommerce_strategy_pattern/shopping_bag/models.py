from django.db import models

from .managers import ShoppingBagManager

from django_ecommerce_strategy_pattern.product.models import (
    Product,
)

from django_ecommerce_strategy_pattern.user_credential_details.models import (
    UserCredentialDetails,
)


class ShoppingBag(models.Model):
    class Meta:
        unique_together = (
            "user",
            "product",
        )

    objects = ShoppingBagManager()

    quantity = models.PositiveIntegerField()

    size = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )

    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="product_shopping_bag",
    )

    user = models.ForeignKey(
        to=UserCredentialDetails,
        on_delete=models.CASCADE,
        related_name="user_shopping_bag",
    )
