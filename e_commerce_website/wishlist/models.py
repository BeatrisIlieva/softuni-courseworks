from django.contrib.auth import get_user_model
from django.db import models

from e_commerce_website.jewelry.models import Jewelry

UserModel = get_user_model()


class JewelryLike(models.Model):
    class Meta:
        unique_together = ('jewelry', 'user')

    jewelry = models.ForeignKey(
        Jewelry,
        on_delete=models.CASCADE,
        null=False,
        blank=True,
    )

    user = models.ForeignKey(
        to=UserModel,
        on_delete=models.CASCADE,
    )
