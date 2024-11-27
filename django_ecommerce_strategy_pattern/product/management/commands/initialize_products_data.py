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

from django_ecommerce_strategy_pattern.product.management.commands.constants import PINK_FACTORY


class Command(BaseCommand):
    help = "Initialize data for your Django app"

    def handle(self, *args, **options):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_gems.settings")
        django.setup()

        self.stdout.write(self.style.SUCCESS("Starting data initialization..."))

        # self.bulk_create_color()
        
        self.create_pink_color_small_size_earring()

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
        
    def create_pink_color_small_size_earring(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Earring.DROP_LENGTH_CHOICES[0][0]
        factory  = ProductFactory(color=color, size=size)
        
        factory.create_earring(
            first_image_url=PINK_FACTORY["earring"]["first_image_url"],
            second_image_url=PINK_FACTORY["earring"]["second_image_url"],
            description=PINK_FACTORY["earring"]["description"],
        )
        
    def create_pink_color_small_size_bracelet(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Bracelet.WRIST_SIZE_CHOICES[0][0]
        factory  = ProductFactory(color=color, size=size)
        
        factory.create_bracelet(
            first_image_url=PINK_FACTORY["bracelet"]["first_image_url"],
            second_image_url=PINK_FACTORY["bracelet"]["second_image_url"],
            description=PINK_FACTORY["bracelet"]["description"],
        )
        
    def create_pink_color_small_size_necklace(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Necklace.NECKLINE_CHOICES[0][0]
        factory  = ProductFactory(color=color, size=size)
        
        factory.create_bracelet(
            first_image_url=PINK_FACTORY["necklace"]["first_image_url"],
            second_image_url=PINK_FACTORY["necklace"]["second_image_url"],
            description=PINK_FACTORY["necklace"]["description"],
        )
        
    def create_pink_color_small_size_ring(self):
        color = Color.objects.get(title=Color.TITLE_CHOICES[0][0])
        size = Ring.FINGER_CIRCUMFERENCE_CHOICES[0][0]
        factory  = ProductFactory(color=color, size=size)
        
        factory.create_bracelet(
            first_image_url=PINK_FACTORY["ring"]["first_image_url"],
            second_image_url=PINK_FACTORY["ring"]["second_image_url"],
            description=PINK_FACTORY["ring"]["description"],
        )
        

    # def bulk_create_description(self):
    #     Description.objects.bulk_create(
    #         [
    #             Description(
    #                 content=""
    #             ),
    #             Description(
    #                 content="28 pear-shaped and round brilliant sapphires weighing a total of approximately 3.00 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum."
    #             ),
    #             Description(
    #                 content="A medley of marquise, pear-shaped, and round brilliant diamonds, weighing a total of approximately 4.38 carats, set in platinum."
    #             ),
    #             Description(
    #                 content=""
    #             ),
    #             Description(
    #                 content="45 pear-shaped and round brilliant sapphires weighing a total of approximately 4.17 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.24 carats, set in platinum."
    #             ),
    #             Description(
    #                 content="78 pear-shaped, marquise, and round brilliant diamonds, weighing a total of approximately 7.46 carats, set in platinum."
    #             ),
    #             Description(
    #                 content=""
    #             ),
    #             Description(
    #                 content="78 pear-shaped and round brilliant sapphires weighing a total of approximately 8.61 carats and 99 marquise and round brilliant diamonds weighing a total of approximately 8.37 carats, set in platinum."
    #             ),
    #             Description(
    #                 content="177 pear-shaped, marquise, and round brilliant diamonds, weighing a total of approximately 15.35 carats, set in platinum."
    #             ),
    #             Description(
    #                 content=""
    #             ),
    #             Description(
    #                 content="6 pear-shaped sapphires weighing a total of approximately 2.15 carats and 1 round brilliant diamond weighing approximately 0.05 carats, set in platinum."
    #             ),
    #             Description(
    #                 content="6 pear-shaped and 1 round brilliant diamond, weighing a total of approximately 1.66 carats, set in platinum."
    #             ),
    #         ]
    #     )

    # def bulk_create_product(self):
    #     categories = Category.objects.all()
    #     colors = Color.objects.all()
    #     descriptions = Description.objects.all()

    #     Product.objects.bulk_create(
    #         [
    #             Product(
    #                 first_image_url="",
    #                 second_image_url="",
    #                 category=categories[0],
    #                 color=colors[0],
    #                 description=descriptions[0],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-1_zx2cga.webp",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-2_vtkyhb.webp",
    #                 category=categories[0],
    #                 color=colors[1],
    #                 description=descriptions[1],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714890/forget-me-not-collection/earrings/forget_me_not_diamond_drop_earrings_eadpdrflrfmn_ee-1_knlt2u.webp",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/earrings/forget_me_not_diamond_drop_earrings_eadpdrflrfmn_ee-2_sksk7o.webp",
    #                 category=categories[0],
    #                 color=colors[2],
    #                 description=descriptions[2],
    #             ),
    #             Product(
    #                 first_image_url="",
    #                 second_image_url="",
    #                 category=categories[1],
    #                 color=colors[0],
    #                 description=descriptions[3],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714894/forget-me-not-collection/bracelets/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_1_fokzrw.webp",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714895/forget-me-not-collection/bracelets/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_2_ojfbze.avif",
    #                 category=categories[1],
    #                 color=colors[1],
    #                 description=descriptions[4],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714893/forget-me-not-collection/bracelets/forget_me_not_diamond_bracelet_brdprfflrfmn_e-1_muieri.avif",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714894/forget-me-not-collection/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_1_pvbpcb.png",
    #                 category=categories[1],
    #                 color=colors[2],
    #                 description=descriptions[5],
    #             ),
    #             Product(
    #                 first_image_url="",
    #                 second_image_url="",
    #                 category=categories[2],
    #                 color=colors[0],
    #                 description=descriptions[6],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714891/forget-me-not-collection/necklaces/forget_me_not_lariat_necklace_diamond_and_sapphire_nkspltflrfmn_e_1_p2uxlj.webp",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714890/forget-me-not-collection/necklaces/forget_me_not_lariat_necklace_diamond_and_sapphire_nkspltflrfmn_e_2_hxgdcy.avif",
    #                 category=categories[2],
    #                 color=colors[1],
    #                 description=descriptions[7],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714886/forget-me-not-collection/necklaces/forget_me_not_lariat_diamond_necklace_nkdpltflrfmn_e-1_u0gwpv.avif",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714891/forget-me-not-collection/necklaces/forget_me_not_lariat_diamond_necklace_nkdpltflrfmn_e-2_tuh8ru.webp",
    #                 category=categories[2],
    #                 color=colors[2],
    #                 description=descriptions[8],
    #             ),
    #             Product(
    #                 first_image_url="",
    #                 second_image_url="",
    #                 category=categories[3],
    #                 color=colors[0],
    #                 description=descriptions[9],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714893/forget-me-not-collection/rings/forget_me_not_ring_diamond_and_sapphire_frsprfflrfmn_e_1_pm9u6t.avif",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714891/forget-me-not-collection/rings/forget_me_not_ring_diamond_and_sapphire_frsprfflrfmn_e_2_ucppcd.avif",
    #                 category=categories[3],
    #                 color=colors[1],
    #                 description=descriptions[10],
    #             ),
    #             Product(
    #                 first_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714891/forget-me-not-collection/rings/forget_me_not_diamond_ring_frdprfflrfmn_e-1h_yueh2k.webp",
    #                 second_image_url="https://res.cloudinary.com/deztgvefu/image/upload/v1723714891/forget-me-not-collection/rings/forget_me_not_diamond_ring_frdprfflrfmn_e-2h_mktny9.webp",
    #                 category=categories[3],
    #                 color=colors[2],
    #                 description=descriptions[11],
    #             ),
    #         ]
    #     )
