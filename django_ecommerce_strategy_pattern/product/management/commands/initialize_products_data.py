import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product import (
    EarringSize,
    BraceletSize,
    NecklaceSize,
    RingSize,
    Category,
    CategorySize,
    Color,
    Product,
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_size()

        self.bulk_create_category()

        self.stdout.write(
            self.style.SUCCESS("Data initialization completed successfully.")
        )

    def bulk_create_size(self):
        EarringSize.objects.bulk_create(
            [
                EarringSize(measurement=4.05),
                EarringSize(measurement=4.98),
                EarringSize(measurement=5.86),
            ]
        )

    def bulk_create_size(self):
        BraceletSize.objects.bulk_create(
            [
                BraceletSize(measurement=15.02),
                BraceletSize(measurement=17.08),
                BraceletSize(measurement=19.03),
            ]
        )

    def bulk_create_size(self):
        NecklaceSize.objects.bulk_create(
            [
                NecklaceSize(measurement=40.64),
                NecklaceSize(measurement=43.18),
                NecklaceSize(measurement=45.72),
            ]
        )

    def bulk_create_size(self):
        RingSize.objects.bulk_create(
            [
                RingSize(measurement=4.7),
                RingSize(measurement=4.9),
                RingSize(measurement=5.05),
            ]
        )

    def bulk_create_category(self):
        Category.objects.bulk_create(
            [
                Category(title="E"),
                Category(title="B"),
                Category(title="N"),
                Category(title="R"),
            ]
        )

    def bulk_create_category_size(self):
        earring_sizes = EarringSize.objects.all()
        bracelet_sizes = BraceletSize.objects.all()
        necklace_sizes = NecklaceSize.objects.all()
        ring_sizes = RingSize.objects.all()

        categories = Category.objects.all()

        CategorySize.objects.bulk_create(
            [
                CategorySize(
                    category=categories[0],
                    size=earring_sizes[0],
                    price=43000.00,
                ),
                CategorySize(
                    category=categories[0],
                    size=earring_sizes[1],
                    price=44000.00,
                ),
                CategorySize(
                    category=categories[0],
                    size=earring_sizes[2],
                    price=45000.00,
                ),
                CategorySize(
                    category=categories[1],
                    size=bracelet_sizes[0],
                    price=34000.00,
                ),
                CategorySize(
                    category=categories[1],
                    size=bracelet_sizes[1],
                    price=35000.00,
                ),
                CategorySize(
                    category=categories[1],
                    size=bracelet_sizes[2],
                    price=36000.00,
                ),
                CategorySize(
                    category=categories[2],
                    size=necklace_sizes[0],
                    price=55000.00,
                ),
                CategorySize(
                    category=categories[2],
                    size=necklace_sizes[1],
                    price=56000.00,
                ),
                CategorySize(
                    category=categories[2],
                    size=necklace_sizes[2],
                    price=57000.00,
                ),
                CategorySize(
                    category=categories[3],
                    size=ring_sizes[0],
                    price=23000.00,
                ),
                CategorySize(
                    category=categories[3],
                    size=ring_sizes[1],
                    price=24000.00,
                ),
                CategorySize(
                    category=categories[3],
                    size=ring_sizes[2],
                    price=25000.00,
                ),
            ]
        )
