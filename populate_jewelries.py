import os
import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()


from e_commerce_website.jewelry.models import ( 
    Jewelry,
    JewelryDetails, 
    JewelryMetal, 
    JewelryStone, 
    Title,
)

from get_all_objects import (
    categories, 
    titles, 
    styles, 
    customer_genders, 
    jewelries, 
    jewelries_by_details,
    metals, 
    gold_carats, 
    stone_types, 
    stone_colors
)


def bulk_create_title(*args):
    Title.objects.bulk_create(*args)
    

bulk_create_title(
    [
        Title(content='Petite DY Elements Drop Earrings'),
    ]
)


def bulk_create_jewelry(*args):
    Jewelry.objects.bulk_create(*args)
    
    
bulk_create_jewelry(
    [
        Jewelry(
            category=categories[0],
            title=titles[0],
            style=styles[0],
            customer_gender=customer_genders[0],
        ),
    ]
)


def bulk_create_jewelry_by_details(*args):
    JewelryDetails.objects.bulk_create(*args)
    
    
bulk_create_jewelry_by_details(
    [
        JewelryDetails(
            jewelry=jewelries[0],
            quantity=10,
            price=2250.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1702045326/E17658D88DBODI_x1ybsz.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1702045070/E17658D88DBODI-alt1_ymzvlv.webp',
        ),
        
        JewelryDetails(
            jewelry=jewelries[0],
            quantity=10,
            price=2250.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1702119059/E17658D88DLADI_a75izb.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1702119053/E17658D88DLADI-alt1_muldrn.webp',
        )
    ]
)


def bulk_create_jewelry_by_metal(*args):
    JewelryMetal.objects.bulk_create(*args)

    
bulk_create_jewelry_by_metal(
    [
        JewelryMetal(
            jewelry=jewelries_by_details[0],
            metal=metals[0],
            gold_carat=gold_carats[3],
        ),
        JewelryMetal(
            jewelry=jewelries_by_details[1],
            metal=metals[0],
            gold_carat=gold_carats[3],
        ),
    ]
)


def bulk_create_jewelry_by_stone(*args):
    JewelryStone.objects.bulk_create(*args)
    

bulk_create_jewelry_by_stone(
    [
        JewelryStone(
            jewelry=jewelries_by_details[0],
            stone_type=stone_types[2],
            stone_color=stone_colors[1],
            stone_carat=0.22,
        ),  
        JewelryStone(
            jewelry=jewelries_by_details[1],
            stone_type=stone_types[11],
            stone_color=stone_colors[3],
            stone_carat=0.22,
        ),  
        
    ]
)

            

