from django.db import models


class ShoppingBagManager(models.Manager):
    def calculate_total_price(self, user):
        """
        Calculates the total price of all items in the shopping bag for a specific user.
        """
        shopping_bag_items = self.filter(user=user)
        total_price = sum(
            item.quantity
            * item.product.product_inventory.filter(size=item.size).first().price
            for item in shopping_bag_items
        )
        return total_price
