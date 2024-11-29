from django.db import models

from django.db.models import Sum, F


class ShoppingBagManager(models.Manager):
    def calculate_total_price(self, user):
        total_price = (
            self.filter(user=user)
            .filter(product__product_inventory__size=F("size"))
            .annotate(item_total=F("quantity") * F("product__product_inventory__price"))
            .aggregate(total=Sum("item_total"))["total"]
        )
        return total_price
