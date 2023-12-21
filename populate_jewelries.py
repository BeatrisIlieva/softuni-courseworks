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
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Queen of Diamonds',
            quantity=10,
            price=163000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703168853/earrings/2/diamond_chandelier_earrings_eadpclafrchaa.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703168594/earrings/2/diamond_chandelier_earrings_eadpclafrcha.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Garland Heart',
            quantity=10,
            price=32000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175666/earrings/3/garland_earrings_diamond_eadphssmoc_581447_e-1_ysmxop.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175667/earrings/3/garland_earrings_diamond_eadphssmoc_581447_e-2_z74pjd.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Pirouette',
            quantity=10,
            price=24000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703176025/earrings/4/pirouette_earrings__diamond__eadprfprspir_e-1_zfcw3e.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703176029/earrings/4/pirouette_earrings__diamond__eadprfprspir_e-2_qafrue.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Lotus Cluster',
            quantity=10,
            price=56000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703177862/earrings/5/lotus_cluster_earrings_diamond_eadpde010ltc_e-1_dstqna.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703177862/earrings/5/lotus_cluster_earrings_diamond_eadpde010ltc_e-2_cd7sd2.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Classics',
            quantity=10,
            price=97000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178292/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-2_gs6ai0.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Heart',
            quantity=10,
            price=14000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178867/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-1_lumsno.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178866/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-2_w2aaff.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Daytime',
            quantity=10,
            price=27000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179269/earrings/8/classics_earrings_diamond_eadpdrmedw_e-1_vptn8c.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179268/earrings/8/classics_earrings_diamond_eadpdrmedw_e-2_h1edi3.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Forget-Me-Not',
            quantity=10,
            price=48000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179446/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_kb2xap.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179447/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_vgnjja.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Pink Flower',
            quantity=10,
            price=21000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179871/earrings/10/forget_me_earrings_diamond_and_pink_sapphire_eapsp1mflrfmn_ee-1_zhnvgu.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179870/earrings/10/forget_me_earrings_diamond_and_pink_sapphire_eapsp1mflrfmn_ee-2_vnawpt.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Berry',
            quantity=10,
            price=37000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703180217/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-1_xvkff7.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703180215/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-2_bcmypf.webp',
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

        JewelryMetal(
            jewelry=jewelries[3],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[4],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[5],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[5],
            metal=metals[0],
            gold_carat=gold_carats[3]
        ),

        JewelryMetal(
            jewelry=jewelries[6],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[7],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[8],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[9],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[10],
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

        JewelryStone(
            jewelry=jewelries[3],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.52,
        ),

        JewelryStone(
            jewelry=jewelries[4],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.30,
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=2.91,
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[20],
            stone_color=stone_colors[8],
            stone_carat=2.03,
        ),

        JewelryStone(
            jewelry=jewelries[6],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=1.00,
        ),

        JewelryStone(
            jewelry=jewelries[7],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=6.41,
        ),

        JewelryStone(
            jewelry=jewelries[8],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=3.20,
        ),

        JewelryStone(
            jewelry=jewelries[8],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=1.98,
        ),

        JewelryStone(
            jewelry=jewelries[9],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=2.20,
        ),

        JewelryStone(
            jewelry=jewelries[9],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.07,
        ),

        JewelryStone(
            jewelry=jewelries[10],
            stone_type=stone_types[8],
            stone_color=stone_colors[4],
            stone_carat=2.01,
        ),

        JewelryStone(
            jewelry=jewelries[10],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=3.35,
        ),
    ]

)
