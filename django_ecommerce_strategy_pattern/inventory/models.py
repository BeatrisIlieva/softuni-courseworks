from django.db import models
from django.core.validators import MaxValueValidator

from django_ecommerce_strategy_pattern.product.models import Product


class Inventory(models.Model):

    class Meta:
        unique_together = ("product", "size", "price")

    quantity = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(
                3, message="The maximum quantity per product inventory is 3."
            ),
        ]
    )


    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
    )
    
    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="inventory",
    )

    @property
    def is_sold_out(self):
        return self.quantity <= 0


# class EarringInventory(BaseInventory):

#     PRICE_CHOICES = (
#         (43_000.00, 43_000.00),
#         (44_000.00, 44_000.00),
#         (45_000.00, 45_000.00),
#     )

#     product = models.ForeignKey(
#         to=Earring,
#         on_delete=models.CASCADE,
#         related_name="inventory",
#     )

#     price = models.DecimalField(
#         max_digits=7,
#         decimal_places=2,
#         choices=PRICE_CHOICES,
#     )


# class BraceletInventory(BaseInventory):

#     PRICE_CHOICES = (
#         (34_000.00, 34_000.00),
#         (35_000.00, 35_000.00),
#         (36_000.00, 36_000.00),
#     )

#     product = models.ForeignKey(
#         to=Bracelet,
#         on_delete=models.CASCADE,
#         related_name="inventory",
#     )

#     price = models.DecimalField(
#         max_digits=7,
#         decimal_places=2,
#         choices=PRICE_CHOICES,
#     )


# class NecklaceInventory(BaseInventory):

#     PRICE_CHOICES = (
#         (55_000.00, 55_000.00),
#         (56_000.00, 56_000.00),
#         (57_000.00, 57_000.00),
#     )

#     product = models.ForeignKey(
#         to=Necklace,
#         on_delete=models.CASCADE,
#         related_name="inventory",
#     )

#     price = models.DecimalField(
#         max_digits=7,
#         decimal_places=2,
#         choices=PRICE_CHOICES,
#     )


# class RingInventory(BaseInventory):

#     PRICE_CHOICES = (
#         (23_000.00, 23_000.00),
#         (24_000.00, 24_000.00),
#         (25_000.00, 25_000.00),
#     )

#     product = models.ForeignKey(
#         to=Ring,
#         on_delete=models.CASCADE,
#         related_name="inventory",
#     )

#     price = models.DecimalField(
#         max_digits=7,
#         decimal_places=2,
#         choices=PRICE_CHOICES,
#     )
