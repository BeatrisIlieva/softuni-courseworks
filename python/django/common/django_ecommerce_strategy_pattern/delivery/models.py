from django.db import models

from django_ecommerce_strategy_pattern.user_shipping_details.models import (
    UserShippingDetails,
)


class DeliveryMethods(models.TextChoices):
    STORE_PICKUP = "SP", "Store Pickup"
    EXPRESS_HOME = "EH", "Express Home Delivery"
    REGULAR_HOME = "RH", "Regular Home Delivery"


class StatusChoices(models.TextChoices):
    PENDING = "PE", "Pending"
    CANCELED = "CN", "Cancelled"
    COMPLETED = "CM", "Completed"


class Delivery(models.Model):
    delivery_method = models.CharField(
        max_length=2,
        choices=DeliveryMethods.choices,
    )
    
    delivery_cost = models.DecimalField(
        max_digits=4,
        decimal_places=2,
    )

    total_cost = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )
    
    due_date = models.DateField()

    status = models.CharField(
        max_length=2,
        choices=StatusChoices,
    )

    user = models.ForeignKey(
        to=UserShippingDetails,
        on_delete=models.CASCADE,
        related_name="delivery",
    )
