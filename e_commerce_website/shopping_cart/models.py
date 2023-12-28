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

    quantity = models.PositiveIntegerField(
        null=True,
        blank=True,
        default=0,
    )

# class Order(models.Model):
#     user = models.ForeignKey(
#         to=AccountUser,
#         on_delete=models.CASCADE
#     )
#     jewelries = models.ManyToManyField(
#         to=Jewelry,
#         through='OrderJewelry'
#     )
#
#
# class OrderJewelry(models.Model):
#     order = models.ForeignKey(
#         to=Order,
#         on_delete=models.CASCADE,
#         primary_key=True
#     )
#     product = models.ForeignKey(
#         to=Jewelry,
#         on_delete=models.CASCADE
#     )
#     quantity = models.PositiveIntegerField()
