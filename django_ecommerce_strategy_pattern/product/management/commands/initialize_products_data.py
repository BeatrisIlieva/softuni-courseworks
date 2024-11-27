import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product.models import (
    Color,
    ProductFactory,
    Earring,
    Bracelet,
    Necklace,
    Ring,
)

from django_ecommerce_strategy_pattern.product.management.commands.constants import (
    PINK_FACTORY,
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_color()


        self.stdout.write(
            self.style.SUCCESS("Data initialization completed successfully.")
        )

    def bulk_create_color(self):
        Color.objects.bulk_create(
            [
                Color(title=Color.TITLE_CHOICES[0][0]),
                Color(title=Color.TITLE_CHOICES[1][0]),
                Color(title=Color.TITLE_CHOICES[2][0]),
            ]
        )

    def create_earrings(self):

        colors = [
            Color.objects.get(title=Color.TITLE_CHOICES[0][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[1][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[2][0]),
        ]
        
        sizes = [
            Earring.DROP_LENGTH_CHOICES[0][0],
            Earring.DROP_LENGTH_CHOICES[1][0],
            Earring.DROP_LENGTH_CHOICES[2][0],
        ]
        
        for color in colors:
            factory = ProductFactory(color=color)
        
            for size in sizes:
                factory.create_earring(
                    first_image_url=PINK_FACTORY["earring"]["first_image_url"],
                    second_image_url=PINK_FACTORY["earring"]["second_image_url"],
                    description=PINK_FACTORY["earring"]["description"],
                    size=size
                )

    def create_pink_color_small_size_bracelet(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Bracelet.WRIST_SIZE_CHOICES[0][0]
        factory = ProductFactory(color=color, size=size)

        factory.create_bracelet(
            first_image_url=PINK_FACTORY["bracelet"]["first_image_url"],
            second_image_url=PINK_FACTORY["bracelet"]["second_image_url"],
            description=PINK_FACTORY["bracelet"]["description"],
        )

    def create_pink_color_small_size_necklace(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Necklace.NECKLINE_CHOICES[0][0]
        factory = ProductFactory(color=color, size=size)

        factory.create_bracelet(
            first_image_url=PINK_FACTORY["necklace"]["first_image_url"],
            second_image_url=PINK_FACTORY["necklace"]["second_image_url"],
            description=PINK_FACTORY["necklace"]["description"],
        )

    def create_pink_color_small_size_ring(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Ring.FINGER_CIRCUMFERENCE_CHOICES[0][0]
        factory = ProductFactory(color=color, size=size)

        factory.create_bracelet(
            first_image_url=PINK_FACTORY["ring"]["first_image_url"],
            second_image_url=PINK_FACTORY["ring"]["second_image_url"],
            description=PINK_FACTORY["ring"]["description"],
        )
