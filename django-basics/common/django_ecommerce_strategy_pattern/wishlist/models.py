from django.db import models

from django_ecommerce_strategy_pattern.product.models import (
    Product,
)

from django_ecommerce_strategy_pattern.user_credential_details.models import (
    UserCredentialDetails,
)


class Wishlist(models.Model):
    class Meta:
        unique_together = (
            "user",
            "product",
        )

    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="product_wishlist",
    )

    user = models.ForeignKey(
        to=UserCredentialDetails,
        on_delete=models.CASCADE,
        related_name="user_wishlist",
    )
