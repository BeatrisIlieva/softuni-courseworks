import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product import (
    Size,
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
        
        self.stdout.write(self.style.SUCCESS('Data initialization completed successfully.'))

    def bulk_create_size(self):
        Size.objects.bulk_create(
            [
                Size(measurement=4.05),
                Size(measurement=4.98),
                Size(measurement=5.86),
                Size(measurement=15.02),
                Size(measurement=17.08),
                Size(measurement=19.03),
                Size(measurement=40.64),
                Size(measurement=43.18),
                Size(measurement=45.72),
                Size(measurement=4.7),
                Size(measurement=4.9),
                Size(measurement=5.05),
            ]
        )
        

    def bulk_create_category(self):        
        Category.objects.bulk_create([
            Category(title="E",),
            Category(title="B"),
            Category(title="N"),
            Category(title="R"),
        ])
        
    def bulk_create_category_size(self):
        sizes = Size.objects.all()
        categories = Category.objects.all()
        
        CategorySize.objects.bulk_create([
            CategorySize(
                category=categories[0],
                size=sizes[0],
                price=43000.00,
            ),
            CategorySize(
                category=categories[0],
                size=sizes[1],
                price=44000.00,
            ),
            CategorySize(
                category=categories[0],
                size=sizes[2],
                price=45000.00,
            ),
            CategorySize(
                category=categories[1],
                size=sizes[1],
                price=44000.00,
            ),
        ])