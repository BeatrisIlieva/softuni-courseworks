from django.db import (
    models,
)

from drf_app.shopping_bag.managers import ShoppingBagManager

from drf_app.inventory.models import (
    Inventory,
)
from drf_app.user_credential_details.models import (
    UserCredentialDetails,
)


class ShoppingBag(models.Model):
    class Meta:
        unique_together = ("user", "inventory")

    objects = ShoppingBagManager()

    quantity = models.PositiveIntegerField(
        default=1,
    )

    inventory = models.ForeignKey(
        to=Inventory,
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    user = models.ForeignKey(
        to=UserCredentialDetails,
        on_delete=models.CASCADE,
    )
