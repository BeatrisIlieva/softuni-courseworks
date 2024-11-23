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
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[0][0], category=categories[0]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[1][0], category=categories[0]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[2][0], category=categories[0]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[3][0], category=categories[1]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[4][0], category=categories[1]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[5][0], category=categories[1]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[6][0], category=categories[2]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[7][0], category=categories[2]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[8][0], category=categories[2]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[9][0], category=categories[3]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[10][0], category=categories[3]
                ),
                Size(
                    measurement=Size.MEASUREMENT_CHOICES[11][0], category=categories[3]
                ),
            ]
        )

    def bulk_create_price(self):
        sizes = Size.objects.all()

        Price.objects.bulk_create(
            [
                Price(amount=Price.AMOUNT_CHOICES[0][0], size=sizes[0]),
                Price(amount=Price.AMOUNT_CHOICES[1][0], size=sizes[1]),
                Price(amount=Price.AMOUNT_CHOICES[2][0], size=sizes[2]),
                Price(amount=Price.AMOUNT_CHOICES[3][0], size=sizes[3]),
                Price(amount=Price.AMOUNT_CHOICES[4][0], size=sizes[4]),
                Price(amount=Price.AMOUNT_CHOICES[5][0], size=sizes[5]),
                Price(amount=Price.AMOUNT_CHOICES[6][0], size=sizes[6]),
                Price(amount=Price.AMOUNT_CHOICES[7][0], size=sizes[7]),
                Price(amount=Price.AMOUNT_CHOICES[8][0], size=sizes[8]),
                Price(amount=Price.AMOUNT_CHOICES[9][0], size=sizes[9]),
                Price(amount=Price.AMOUNT_CHOICES[10][0], size=sizes[10]),
                Price(amount=Price.AMOUNT_CHOICES[11][0], size=sizes[11]),
            ]
        )

    def bulk_create_inventory(self):
        sizes = Size.objects.all()
        prices = Price.objects.all()
        products = Product.objects.all()

        Inventory.objects.bulk_create(
            [
                Inventory(
                    quantity=3, product=products[0], size=sizes[0], price=prices[0]
                ),
                Inventory(
                    quantity=3, product=products[0], size=sizes[1], price=prices[1]
                ),
                Inventory(
                    quantity=3, product=products[0], size=sizes[2], price=prices[2]
                ),
                Inventory(
                    quantity=3, product=products[1], size=sizes[0], price=prices[0]
                ),
                Inventory(
                    quantity=3, product=products[1], size=sizes[1], price=prices[1]
                ),
                Inventory(
                    quantity=3, product=products[1], size=sizes[2], price=prices[2]
                ),
                Inventory(
                    quantity=3, product=products[2], size=sizes[0], price=prices[0]
                ),
                Inventory(
                    quantity=3, product=products[2], size=sizes[1], price=prices[1]
                ),
                Inventory(
                    quantity=3, product=products[2], size=sizes[2], price=prices[2]
                ),
                Inventory(
                    quantity=3, product=products[3], size=sizes[3], price=prices[3]
                ),
                Inventory(
                    quantity=3, product=products[3], size=sizes[4], price=prices[4]
                ),
                Inventory(
                    quantity=3, product=products[3], size=sizes[5], price=prices[5]
                ),
                Inventory(
                    quantity=3, product=products[4], size=sizes[3], price=prices[3]
                ),
                Inventory(
                    quantity=3, product=products[4], size=sizes[4], price=prices[4]
                ),
                Inventory(
                    quantity=3, product=products[4], size=sizes[5], price=prices[5]
                ),
                Inventory(
                    quantity=3, product=products[5], size=sizes[3], price=prices[3]
                ),
                Inventory(
                    quantity=3, product=products[5], size=sizes[4], price=prices[4]
                ),
                Inventory(
                    quantity=3, product=products[5], size=sizes[5], price=prices[5]
                ),
                Inventory(
                    quantity=3, product=products[6], size=sizes[6], price=prices[6]
                ),
                Inventory(
                    quantity=3, product=products[6], size=sizes[7], price=prices[7]
                ),
                Inventory(
                    quantity=3, product=products[6], size=sizes[8], price=prices[8]
                ),
                Inventory(
                    quantity=3, product=products[7], size=sizes[6], price=prices[6]
                ),
                Inventory(
                    quantity=3, product=products[7], size=sizes[7], price=prices[7]
                ),
                Inventory(
                    quantity=3, product=products[7], size=sizes[8], price=prices[8]
                ),
                Inventory(
                    quantity=3, product=products[8], size=sizes[6], price=prices[6]
                ),
                Inventory(
                    quantity=3, product=products[8], size=sizes[7], price=prices[7]
                ),
                Inventory(
                    quantity=3, product=products[8], size=sizes[8], price=prices[8]
                ),
                Inventory(
                    quantity=3, product=products[9], size=sizes[9], price=prices[9]
                ),
                Inventory(
                    quantity=3, product=products[9], size=sizes[10], price=prices[10]
                ),
                Inventory(
                    quantity=3, product=products[9], size=sizes[11], price=prices[11]
                ),
                Inventory(
                    quantity=3, product=products[10], size=sizes[9], price=prices[9]
                ),
                Inventory(
                    quantity=3, product=products[10], size=sizes[10], price=prices[10]
                ),
                Inventory(
                    quantity=3, product=products[10], size=sizes[11], price=prices[11]
                ),
                Inventory(
                    quantity=3, product=products[11], size=sizes[9], price=prices[9]
                ),
                Inventory(
                    quantity=3, product=products[11], size=sizes[10], price=prices[10]
                ),
                Inventory(
                    quantity=3, product=products[11], size=sizes[11], price=prices[11]
                ),
            ]
        )
