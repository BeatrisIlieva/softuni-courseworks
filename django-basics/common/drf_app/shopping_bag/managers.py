from django.db import (
    models,
)
from django.db.models import (
    Sum,
    F,
    Case,
    Value,
    When,
    CharField,
    DecimalField,
)
from django.db.models import Sum, F, Case, When, Value, Window
from django.db.models.functions import Coalesce, RowNumber

from drf_app.inventory.models import (
    Inventory,
)


class ShoppingBagManager(models.Manager):
    def add_item(self, inventory_pk, user):
        inventory = Inventory.objects.get(pk=inventory_pk)

        if inventory.quantity == 0:
            return "Not enough inventory quantity"

        inventory.quantity -= 1
        inventory.save()

        shopping_bag_item, created = self.get_or_create(user=user, inventory=inventory)

        if not created:

            shopping_bag_item.quantity += 1
            shopping_bag_item.save()

            return "Shopping bag item quantity has been increased"

        return "Item has been added to shopping bag"

    def increase_item_quantity(self, inventory_pk, user):
        inventory = Inventory.objects.get(pk=inventory_pk)

        if inventory.quantity == 0:
            return "Not enough inventory quantity"

        inventory.quantity -= 1
        inventory.save()

        self.filter(inventory=inventory, user=user).update(quantity=F("quantity") + 1)

        return "Quantity has been increased"

    def decrease_item_quantity(self, inventory_pk, user):
        shopping_bag_item = self.filter(inventory__pk=inventory_pk, user=user).first()

        if not shopping_bag_item:
            return "Item not found in the bag"

        inventory = Inventory.objects.get(pk=inventory_pk)
        inventory.quantity += 1
        inventory.save()

        shopping_bag_item.quantity -= 1
        shopping_bag_item.save()

        if shopping_bag_item.quantity == 0:
            shopping_bag_item.delete()
            return "Bag item has been deleted"

        return "Quantity has been decreased"

    def calculate_total_price(self, user):
        total_price = (
            self.filter(user=user)
            .annotate(item_total=F("quantity") * F("inventory__price"))
            .aggregate(total_price=Sum("item_total"))["total_price"]
        )

        return total_price

    def get_all_shopping_bag_items_per_user(self, user):
        queryset = (
            self.filter(user=user)
            .select_related(
                "inventory",
                "inventory__product",
                "inventory__product__category",
                "inventory__product__color",
            )
            .annotate(
                first_image=F("inventory__product__first_image_url"),
                full_category_title=Case(
                    When(
                        inventory__product__category__title="E", then=Value("Earrings")
                    ),
                    When(
                        inventory__product__category__title="B", then=Value("Bracelets")
                    ),
                    When(
                        inventory__product__category__title="N", then=Value("Necklaces")
                    ),
                    When(inventory__product__category__title="R", then=Value("Rings")),
                    default=Value("Unknown Category"),
                    output_field=CharField(),
                ),
                full_color_title=Case(
                    When(inventory__product__color__title="P", then=Value("Pink")),
                    When(inventory__product__color__title="B", then=Value("Blue")),
                    When(inventory__product__color__title="W", then=Value("White")),
                    default=Value("Unknown Color"),
                    output_field=CharField(),
                ),
                price=F("inventory__price"),
                size=F("inventory__size"),
                annotated_quantity=F("quantity"),
                total_per_item=Coalesce(
                    F("inventory__price"), Value(0), output_field=DecimalField()
                )
                * Coalesce(F("quantity"), Value(0), output_field=DecimalField()),
                total_bag_sum=Window(
                    expression=Sum(
                        Coalesce(
                            F("inventory__price"), Value(0), output_field=DecimalField()
                        )
                        * Coalesce(F("quantity"), Value(0), output_field=DecimalField())
                    ),
                    partition_by=[],
                ),
                row_number=Window(
                    expression=RowNumber(),
                    partition_by=[],
                ),
            )
            .annotate(total_bag_sum=F("total_bag_sum"))
            .values(
                "first_image",
                "full_color_title",
                "full_category_title",
                "size",
                "quantity",
                "total_per_item",
                "total_bag_sum",
            )
        ).order_by("-created_at")

        return queryset
