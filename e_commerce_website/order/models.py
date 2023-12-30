from django.db import models
from django.utils.translation import gettext_lazy as _

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.jewelry.utils import calculate_max_choices_length


class Order(models.Model):
    user = models.ForeignKey(
        to=AccountUser,
        on_delete=models.CASCADE
    )


class OrderProducts(models.Model):
    class Meta:
        unique_together = ('order', 'product')

    order = models.ForeignKey(
        to=Order,
        on_delete=models.CASCADE,
    )
    product = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

class AccountOrders(models.Model):
    class StatusChoices(models.TextChoices):
        P = "P", _("Pending")
        CO = "CO", _("Completed")
        CA = "CA", _("Cancelled")

    order_id = models.ForeignKey(
        to=Order,
        on_delete=models.CASCADE,
    )

    jewelries = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
    )

    quantity = models.IntegerField()

    max_choice_length = calculate_max_choices_length(StatusChoices)

    status = models.CharField(
        max_length=max_choice_length,
        choices=StatusChoices.choices,
    )


