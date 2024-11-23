import os
import django
from django.core.management.base import BaseCommand

from django_ecommerce_strategy_pattern.product.models import (
    Description,
    Color,
    Product,
    Category,
)


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        self.bulk_create_category()

        self.bulk_create_color()

        self.bulk_create_description()

        self.bulk_create_product()

        self.stdout.write(
            self.style.SUCCESS("Data initialization completed successfully.")
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

    def bulk_create_color(self):
        Color.objects.bulk_create(
            [
                Color(title="P"),
                Color(title="B"),
                Color(title="W"),
            ]
        )

    def bulk_create_description(self):
        Description.objects.bulk_create(
            [
                Description(content="some content1"),
                Description(content="some content2"),
            ]
        )

    def bulk_create_product(self):
        categories = Category.objects.all()
        colors = Color.objects.all()
        descriptions = Description.objects.all()

        Product.objects.bulk_create(
            [
                Product(
                    first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714885/forget-me-not-collection/earrings/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_zzaw4q.webp",
                    second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_p9jicb.webp",
                    category=categories[0],
                    color=colors[0],
                    description=descriptions[0],
                ),
                Product(
                    first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714894/forget-me-not-collection/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_1_vz9pv4.avif",
                    second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714894/forget-me-not-collection/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_1_pvbpcb.png",
                    category=categories[1],
                    color=colors[0],
                    description=descriptions[1],
                ),
            ]
        )
