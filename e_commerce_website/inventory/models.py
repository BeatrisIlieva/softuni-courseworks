from django.db import models
from e_commerce_website.core.mixins import ChoicesMaxLengthMixin
from django.utils.translation import gettext_lazy as _
from e_commerce_website.jewelry.models import Jewelry


class Inventory(models.Model):
    class Meta:
        verbose_name_plural = 'Inventories'
    class PriceChoices(ChoicesMaxLengthMixin, models.TextChoices):
        V_750 = '10_000, 25_000', _('10,000.00 - 25,000.00')
        V_1500 = '25_000, 50_000', _('25,000.00 - 50,000.00')
        V_3000 = '50_000, 75_000', _('50,000.00 - 75,000.00')
        V_5000 = '75_000, 100_000', _('75,000.00 - 100,000.00')
        V_100000 = '100_000, 1_000_000', _('ABOVE 100,000.00')

    quantity = models.PositiveIntegerField()

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
    )

    price = models.DecimalField(
        max_length=PriceChoices.max_length(),
        max_digits=10,
        decimal_places=2,
    )

    discounted_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
    )

    def __str__(self):
        return f'Inventory ID: {self.pk}'