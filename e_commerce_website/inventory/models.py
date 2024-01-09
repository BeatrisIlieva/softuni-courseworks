from django.db import models

from e_commerce_website.jewelry.models import Jewelry


class Inventory(models.Model):
    quantity = models.PositiveIntegerField()
    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
    )
