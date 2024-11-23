import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product.models import (
    Product,
    Category,
)

from django_ecommerce_strategy_pattern.inventory.models import (
    Size,
    Price,
    Inventory,
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_size()
        self.bulk_create_price()
        self.bulk_create_inventory()

        self.stdout.write(
            self.style.SUCCESS("Data initialization completed successfully.")
        )
        
    def bulk_create_size(self):
        categories = Category.objects.all()
        
        Size.objects.bulk_create(
            [
                Size(measurement=Size.MEASUREMENT_CHOICES[0][0], category=categories[0]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][1], category=categories[0]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][2], category=categories[0]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][0], category=categories[1]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][1], category=categories[1]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][2], category=categories[1]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][0], category=categories[2]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][1], category=categories[2]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][2], category=categories[2]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][0], category=categories[3]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][1], category=categories[3]),
                Size(measurement=Size.MEASUREMENT_CHOICES[0][2], category=categories[3]),
            ]
        )
        
    def bulk_create_price(self):
        sizes = Size.objects.all()
        
        Price.objects.bulk_create(
            [
                Price(amount=Price.AMOUNT_CHOICES[0][0], size=sizes[0])
                Price(amount=Price.AMOUNT_CHOICES[1][0], size=sizes[1])
                Price(amount=Price.AMOUNT_CHOICES[2][0], size=sizes[2])
                Price(amount=Price.AMOUNT_CHOICES[3][0], size=sizes[3])
                Price(amount=Price.AMOUNT_CHOICES[4][0], size=sizes[4])
                Price(amount=Price.AMOUNT_CHOICES[5][0], size=sizes[5])
                Price(amount=Price.AMOUNT_CHOICES[6][0], size=sizes[6])
                Price(amount=Price.AMOUNT_CHOICES[7][0], size=sizes[7])
                Price(amount=Price.AMOUNT_CHOICES[8][0], size=sizes[8])
                Price(amount=Price.AMOUNT_CHOICES[9][0], size=sizes[9])
                Price(amount=Price.AMOUNT_CHOICES[10][0], size=sizes[10])
                Price(amount=Price.AMOUNT_CHOICES[11][0], size=sizes[11])
            ]
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
