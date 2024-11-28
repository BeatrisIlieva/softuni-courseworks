from django.db import models

from django.db.models import Min, Max


class ProductManager(models.Manager):

    def get_product_entity_short_details(self, category_pk, color_pk):
        return (
            self.filter(category__pk=category_pk, color__pk=color_pk)
            .select_related("category", "color")
            .prefetch_related("product_inventory")
            .annotate(
                min_price=Min("product_inventory__price"),
                max_price=Max("product_inventory__price"),
            )
        )

    def get_product_entity_full_details(self, category_pk, color_pk):
        return (
            self.filter(category__pk=category_pk, color__pk=color_pk)
            .select_related("category", "description", "color")
            .prefetch_related("product_inventory")
        )
