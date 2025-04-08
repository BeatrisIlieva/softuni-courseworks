from django.db import models
from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.jewelry.models import Jewelry


class ShoppingCart(models.Model):
    class Meta:
        unique_together = ('session_key', 'jewelry')

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(
        default=1,
        null=True,
        blank=True,
    )

    size = models.CharField(
        max_length=10,
    )

    order_completed = models.BooleanField(
        default=False,
    )

    session_key = models.CharField(
        max_length=100,
    )

    created_at = models.DateTimeField(
        auto_now=True,
    )
