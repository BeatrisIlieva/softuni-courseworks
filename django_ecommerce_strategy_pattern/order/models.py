from django.db import models

from django_ecommerce_strategy_pattern.user_credential_details.models import (
    UserCredentialDetails,
)

from django_ecommerce_strategy_pattern.product.models import (
    Product,
)


class Order(models.Model):
    user = models.ForeignKey(
        to=UserCredentialDetails,
        on_delete=models.CASCADE,
        related_name="user_order",
    )


class DeliveryMethods(models.TextChoices):
    STORE_PICKUP = "SP", "Store Pickup"
    EXPRESS_HOME = "EH", "Express Home Delivery"
    REGULAR_HOME = "RH", "Regular Home Delivery"


class OrderProducts(models.Model):

    order = models.ForeignKey(
        to=Order,
        on_delete=models.CASCADE,
        related_name="order",
    )

    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="product",
    )

    size = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )

    quantity = models.PositiveIntegerField()

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    delivery_method = models.CharField(
        max_length=2,
        choices=DeliveryMethods.choices,
    )
