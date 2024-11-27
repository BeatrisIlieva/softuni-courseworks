import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product.models.color import (
    Color,
)

from django_ecommerce_strategy_pattern.product.models.description import (
    Description,
)

from django_ecommerce_strategy_pattern.product.models.image_url import (
    FirstImageUrl,
    SecondImageUrl,
)

from django_ecommerce_strategy_pattern.product.models.product import (
    Earring,
    Bracelet,
    Necklace,
    Ring,
)

from django_ecommerce_strategy_pattern.product.management.commands.constants import (
    PINK_FACTORY,
    BLUE_FACTORY,
    WHITE_FACTORY,
)

from django_ecommerce_strategy_pattern.product.factories.product_factory import (
    ProductFactory,
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_colors()

        self.bulk_create_first_image_urls()

        self.bulk_create_second_image_urls()

        self.bulk_create_descriptions()

        self.create_earrings()

        self.create_bracelets()

        self.create_necklaces()

        self.create_rings()

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
                Description(content=PINK_FACTORY["earring"]["description"]),
                Description(content=PINK_FACTORY["bracelet"]["description"]),
                Description(content=PINK_FACTORY["necklace"]["description"]),
                Description(content=PINK_FACTORY["ring"]["description"]),
                Description(content=BLUE_FACTORY["earring"]["description"]),
                Description(content=BLUE_FACTORY["bracelet"]["description"]),
                Description(content=BLUE_FACTORY["necklace"]["description"]),
                Description(content=BLUE_FACTORY["ring"]["description"]),
                Description(content=WHITE_FACTORY["earring"]["description"]),
                Description(content=WHITE_FACTORY["bracelet"]["description"]),
                Description(content=WHITE_FACTORY["necklace"]["description"]),
                Description(content=WHITE_FACTORY["ring"]["description"]),
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

        first_image_urls = [
            FirstImageUrl.objects.get(pk=1),
            FirstImageUrl.objects.get(pk=5),
            FirstImageUrl.objects.get(pk=9),
        ]
        second_image_urls = [
            SecondImageUrl.objects.get(pk=1),
            SecondImageUrl.objects.get(pk=5),
            SecondImageUrl.objects.get(pk=9),
        ]
        descriptions = [
            Description.objects.get(pk=1),
            Description.objects.get(pk=5),
            Description.objects.get(pk=9),
        ]

        for index, color in enumerate(colors):
            factory = ProductFactory(color=color)

            for size in sizes:
                factory.create_earring(
                    first_image_url=first_image_urls[index],
                    second_image_url=second_image_urls[index],
                    description=descriptions[index],
                    size=size,
                )

    def create_bracelets(self):

        colors = [
            Color.objects.get(title=Color.TITLE_CHOICES[0][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[1][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[2][0]),
        ]

        sizes = [
            Bracelet.WRIST_SIZE_CHOICES[0][0],
            Bracelet.WRIST_SIZE_CHOICES[1][0],
            Bracelet.WRIST_SIZE_CHOICES[2][0],
        ]

        first_image_urls = [
            FirstImageUrl.objects.get(pk=2),
            FirstImageUrl.objects.get(pk=6),
            FirstImageUrl.objects.get(pk=10),
        ]
        second_image_urls = [
            SecondImageUrl.objects.get(pk=2),
            SecondImageUrl.objects.get(pk=6),
            SecondImageUrl.objects.get(pk=10),
        ]
        descriptions = [
            Description.objects.get(pk=2),
            Description.objects.get(pk=6),
            Description.objects.get(pk=10),
        ]

        for index, color in enumerate(colors):
            factory = ProductFactory(color=color)

            for size in sizes:
                factory.create_bracelet(
                    first_image_url=first_image_urls[index],
                    second_image_url=second_image_urls[index],
                    description=descriptions[index],
                    size=size,
                )

    def create_necklaces(self):

        colors = [
            Color.objects.get(title=Color.TITLE_CHOICES[0][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[1][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[2][0]),
        ]

        sizes = [
            Necklace.NECKLINE_CHOICES[0][0],
            Necklace.NECKLINE_CHOICES[1][0],
            Necklace.NECKLINE_CHOICES[2][0],
        ]

        first_image_urls = [
            FirstImageUrl.objects.get(pk=3),
            FirstImageUrl.objects.get(pk=7),
            FirstImageUrl.objects.get(pk=11),
        ]
        second_image_urls = [
            SecondImageUrl.objects.get(pk=3),
            SecondImageUrl.objects.get(pk=7),
            SecondImageUrl.objects.get(pk=11),
        ]
        descriptions = [
            Description.objects.get(pk=3),
            Description.objects.get(pk=7),
            Description.objects.get(pk=11),
        ]

        for index, color in enumerate(colors):
            factory = ProductFactory(color=color)

            for size in sizes:
                factory.create_necklace(
                    first_image_url=first_image_urls[index],
                    second_image_url=second_image_urls[index],
                    description=descriptions[index],
                    size=size,
                )

    def create_rings(self):

        colors = [
            Color.objects.get(title=Color.TITLE_CHOICES[0][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[1][0]),
            Color.objects.get(title=Color.TITLE_CHOICES[2][0]),
        ]

        sizes = [
            Ring.FINGER_CIRCUMFERENCE_CHOICES[0][0],
            Ring.FINGER_CIRCUMFERENCE_CHOICES[1][0],
            Ring.FINGER_CIRCUMFERENCE_CHOICES[2][0],
        ]

        first_image_urls = [
            FirstImageUrl.objects.get(pk=4),
            FirstImageUrl.objects.get(pk=8),
            FirstImageUrl.objects.get(pk=12),
        ]
        second_image_urls = [
            SecondImageUrl.objects.get(pk=4),
            SecondImageUrl.objects.get(pk=8),
            SecondImageUrl.objects.get(pk=12),
        ]
        descriptions = [
            Description.objects.get(pk=4),
            Description.objects.get(pk=8),
            Description.objects.get(pk=12),
        ]

        for index, color in enumerate(colors):
            factory = ProductFactory(color=color)

            for size in sizes:
                factory.create_ring(
                    first_image_url=first_image_urls[index],
                    second_image_url=second_image_urls[index],
                    description=descriptions[index],
                    size=size,
                )
