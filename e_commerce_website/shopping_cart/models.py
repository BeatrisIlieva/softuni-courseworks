from django.db import models

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.jewelry.models import Jewelry


class ShoppingCart(models.Model):
    class Meta:
        unique_together = ('user', 'jewelry')

    user = models.ForeignKey(
        to=AccountUser,
        on_delete=models.CASCADE
    )

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    order_completed = models.BooleanField(
        default=False,
    )



