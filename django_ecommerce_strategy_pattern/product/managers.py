from django.db import models


class ProductManager(models.Manager):
    
    # @classmethod
    def get_product_entity(self, category_pk, color_pk):
        return (
            self.filter(category__pk=category_pk, color__pk=color_pk)
            .select_related("category", "description", "color")
            .prefetch_related("product_inventory__size", "product_inventory__price")
        )
