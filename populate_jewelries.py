import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()

from e_commerce_website.jewelry.models import (
    Jewelry,
    JewelryMetal,
    JewelryStone,
)

from get_all_objects import (
    categories,
    jewelries,
    metals,
    gold_carats,
    stone_types,
    stone_colors
)


def bulk_create_jewelry(*args):
    Jewelry.objects.bulk_create(*args)


bulk_create_jewelry(
    [
        Jewelry(
            title='Chandelier',
            quantity=10,
            price=120000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct_e-1_lsdgdg.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct_e-2_udb3ag.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Queen of Diamonds',
            quantity=10,
            price=160000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703168853/earrings/2/diamond_chandelier_earrings_eadpclafrcha_e-1_d4kztt.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703168594/earrings/2/diamond_chandelier_earrings_eadpclafrcha_e-2_ltsgnc.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Garland Heart',
            quantity=10,
            price=30000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175666/earrings/3/garland_by_harry_winston_earrings_diamond_eadphssmoc_581447_e-1_ysmxop.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175667/earrings/3/garland_by_harry_winston_earrings_diamond_eadphssmoc_581447_e-2_z74pjd.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Pirouette',
            quantity=10,
            price=25000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703176025/earrings/4/pirouette_by_harry_winston_earrings__diamond__eadprfprspir_e-1_zfcw3e.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175667/earrings/3/garland_by_harry_winston_earrings_diamond_eadphssmoc_581447_e-2_z74pjd.webp',
            category=categories[1],
        ),

    ]
)


def bulk_create_jewelry_by_metal(*args):
    JewelryMetal.objects.bulk_create(*args)


bulk_create_jewelry_by_metal(
    [
        JewelryMetal(
            jewelry=jewelries[0],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[1],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[2],
            metal=metals[3],
        ),

    ]
)


def bulk_create_jewelry_by_stone(*args):
    JewelryStone.objects.bulk_create(*args)


bulk_create_jewelry_by_stone(
    [
        JewelryStone(
            jewelry=jewelries[0],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=16.81,
        ),

        JewelryStone(
            jewelry=jewelries[1],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=9.21,
        ),

        JewelryStone(
            jewelry=jewelries[2],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=2.05,
        ),
    ]
)
