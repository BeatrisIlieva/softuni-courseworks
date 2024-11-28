# from django.db import models
# from django.core.validators import MaxValueValidator






# class Price(models.Model):
#     AMOUNT_CHOICES = (
#         (43_000.00, 43_000.00),
#         (44_000.00, 44_000.00),
#         (45_000.00, 45_000.00),
#         (34_000.00, 34_000.00),
#         (35_000.00, 35_000.00),
#         (36_000.00, 36_000.00),
#         (55_000.00, 55_000.00),
#         (56_000.00, 56_000.00),
#         (57_000.00, 57_000.00),
#         (23_000.00, 23_000.00),
#         (24_000.00, 24_000.00),
#         (25_000.00, 25_000.00),
#     )

#     amount = models.DecimalField(
#         max_digits=7,
#         decimal_places=2,
#     )

#     size = models.ForeignKey(
#         to=Size,
#         on_delete=models.CASCADE,
#         related_name="price",
#     )


# class Inventory(models.Model):

#     class Meta:
#         unique_together = ("product", "size", "price")

#     quantity = models.PositiveIntegerField(
#         validators=[
#             MaxValueValidator(
#                 3, message="The maximum quantity per product inventory is 3."
#             ),
#         ]
#     )

#     product = models.ForeignKey(
#         to=Product,
#         on_delete=models.CASCADE,
#         related_name="product_inventory",
#     )

#     size = models.ForeignKey(
#         to=Size,
#         on_delete=models.CASCADE,
#         related_name="size_inventory",
#     )

#     price = models.ForeignKey(
#         to=Price,
#         on_delete=models.CASCADE,
#         related_name="price_inventory",
#     )

#     @property
#     def is_sold_out(self):
#         return self.quantity <= 0
