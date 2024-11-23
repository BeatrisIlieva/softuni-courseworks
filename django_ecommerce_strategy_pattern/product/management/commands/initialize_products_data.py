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
                Description(content="28 pear-shaped and round brilliant sapphires weighing a total of approximately 3.20 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum."),
                Description(content="28 pear-shaped and round brilliant sapphires weighing a total of approximately 3.00 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum."),
                Description(content="A medley of marquise, pear-shaped, and round brilliant diamonds, weighing a total of approximately 4.38 carats, set in platinum."),
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
                    first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-1_zx2cga.webp",
                    second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-2_vtkyhb.webp",
                    category=categories[0],
                    color=colors[1],
                    description=descriptions[1],
                ),
                
                Product(
                    first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714890/forget-me-not-collection/earrings/forget_me_not_diamond_drop_earrings_eadpdrflrfmn_ee-1_knlt2u.webp",
                    second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_diamond_drop_earrings_eadpdrflrfmn_ee-2_sksk7o.webp",
                    category=categories[0],
                    color=colors[2],
                    description=descriptions[2],
                ),

            ]
        )
