import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product.models import (
    Product,
)

from django_ecommerce_strategy_pattern.inventory.models import (
    Inventory,
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_inventory()

        self.stdout.write(
            self.style.SUCCESS("Data initialization completed successfully.")
        )

    def bulk_create_inventory(self):
        products = Product.objects.all()

        Inventory.objects.bulk_create(
            [
                Inventory(quantity=3, price=43_000.00, size=4.05, product=products[0]),
                Inventory(quantity=3, price=44_000.00, size=4.98, product=products[0]),
                Inventory(quantity=3, price=45_000.00, size=5.86, product=products[0]),
                Inventory(quantity=3, price=43_000.00, size=4.05, product=products[1]),
                Inventory(quantity=3, price=44_000.00, size=4.98, product=products[1]),
                Inventory(quantity=3, price=45_000.00, size=5.86, product=products[1]),
            ]
        )
