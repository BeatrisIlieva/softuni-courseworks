import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product.models import (
    Color,
    FirstImageUrl,
    SecondImageUrl,
    Description,
    ProductFactory,
    Earring,
    Bracelet,
    Necklace,
    Ring,
)

from django_ecommerce_strategy_pattern.product.management.commands.constants import (
    PINK_FACTORY,
    BLUE_FACTORY,
    WHITE_FACTORY
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_colors()

        self.stdout.write(
            self.style.SUCCESS("Data initialization completed successfully.")
        )

    def bulk_create_colors(self):
        Color.objects.bulk_create(
            [
                Color(title=Color.TITLE_CHOICES[0][0]),
                Color(title=Color.TITLE_CHOICES[1][0]),
                Color(title=Color.TITLE_CHOICES[2][0]),
            ]
        )

    def bulk_create_first_image_urls(self):
        FirstImageUrl.objects.bulk_create(
            [
                FirstImageUrl(address=PINK_FACTORY["earring"]["first_image_url"]),
                FirstImageUrl(address=PINK_FACTORY["bracelet"]["first_image_url"]),
                FirstImageUrl(address=PINK_FACTORY["necklace"]["first_image_url"]),
                FirstImageUrl(address=PINK_FACTORY["ring"]["first_image_url"]),
                FirstImageUrl(address=BLUE_FACTORY["earring"]["first_image_url"]),
                FirstImageUrl(address=BLUE_FACTORY["bracelet"]["first_image_url"]),
                FirstImageUrl(address=BLUE_FACTORY["necklace"]["first_image_url"]),
                FirstImageUrl(address=BLUE_FACTORY["ring"]["first_image_url"]),
                FirstImageUrl(address=WHITE_FACTORY["earring"]["first_image_url"]),
                FirstImageUrl(address=WHITE_FACTORY["bracelet"]["first_image_url"]),
                FirstImageUrl(address=WHITE_FACTORY["necklace"]["first_image_url"]),
                FirstImageUrl(address=WHITE_FACTORY["ring"]["first_image_url"]),
            ]
        )
        
    def bulk_create_second_image_urls(self):
        SecondImageUrl.objects.bulk_create(
            [
                SecondImageUrl(address=PINK_FACTORY["earring"]["second_image_url"]),
                SecondImageUrl(address=PINK_FACTORY["bracelet"]["second_image_url"]),
                SecondImageUrl(address=PINK_FACTORY["necklace"]["second_image_url"]),
                SecondImageUrl(address=PINK_FACTORY["ring"]["second_image_url"]),
                SecondImageUrl(address=BLUE_FACTORY["earring"]["second_image_url"]),
                SecondImageUrl(address=BLUE_FACTORY["bracelet"]["second_image_url"]),
                SecondImageUrl(address=BLUE_FACTORY["necklace"]["second_image_url"]),
                SecondImageUrl(address=BLUE_FACTORY["ring"]["second_image_url"]),
                SecondImageUrl(address=WHITE_FACTORY["earring"]["second_image_url"]),
                SecondImageUrl(address=WHITE_FACTORY["bracelet"]["second_image_url"]),
                SecondImageUrl(address=WHITE_FACTORY["necklace"]["second_image_url"]),
                SecondImageUrl(address=WHITE_FACTORY["ring"]["second_image_url"]),
            ]
        )
    def bulk_create_descriptions(self):
        Description.objects.bulk_create(
            [
                Description(address=PINK_FACTORY["earring"]["description"]),
                Description(address=PINK_FACTORY["bracelet"]["description"]),
                Description(address=PINK_FACTORY["necklace"]["description"]),
                Description(address=PINK_FACTORY["ring"]["description"]),
                Description(address=BLUE_FACTORY["earring"]["description"]),
                Description(address=BLUE_FACTORY["bracelet"]["description"]),
                Description(address=BLUE_FACTORY["necklace"]["description"]),
                Description(address=BLUE_FACTORY["ring"]["description"]),
                Description(address=WHITE_FACTORY["earring"]["description"]),
                Description(address=WHITE_FACTORY["bracelet"]["description"]),
                Description(address=WHITE_FACTORY["necklace"]["description"]),
                Description(address=WHITE_FACTORY["ring"]["description"]),
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
                    size=size,
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
