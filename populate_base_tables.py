import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()

from e_commerce_website.jewelry.models import (
    Category,
    GoldCaratWeight,
    Metal,
    Size,
    StoneColor,
    StoneType,
)

from get_all_objects import categories


def bulk_create_category(*args):
    Category.objects.bulk_create(*args)


bulk_create_category(
    [
        Category(title='B'),
        Category(title='E'),
        Category(title='N'),
        Category(title='R'),
    ]
)


def bulk_create_metal(*args):
    Metal.objects.bulk_create(*args)


bulk_create_metal(
    [
        Metal(title='YG'),
        Metal(title="RG"),
        Metal(title="WG"),
        Metal(title='PT')
    ]
)


def bulk_create_gold_carat_weight(*args):
    GoldCaratWeight.objects.bulk_create(*args)


bulk_create_gold_carat_weight(
    [
        GoldCaratWeight(weight="9"),
        GoldCaratWeight(weight="10"),
        GoldCaratWeight(weight="14"),
        GoldCaratWeight(weight="18"),
        GoldCaratWeight(weight="22"),
    ]
)


def bulk_create_stone_title(*args):
    StoneType.objects.bulk_create(*args)


bulk_create_stone_title(
    [
        StoneType(title="AG"),
        StoneType(title="AM"),
        StoneType(title="BO"),
        StoneType(title="CH"),
        StoneType(title="CR"),
        StoneType(title="CI"),
        StoneType(title="CY"),
        StoneType(title="DI"),
        StoneType(title="EM"),
        StoneType(title="GA"),
        StoneType(title="IN"),
        StoneType(title="LL"),
        StoneType(title="MA"),
        StoneType(title="MO"),
        StoneType(title="PE"),
        StoneType(title="PR"),
        StoneType(title="PI"),
        StoneType(title="PS"),
        StoneType(title="QU"),
        StoneType(title="RB"),
        StoneType(title="RU"),
        StoneType(title="SA"),
        StoneType(title="TA"),
        StoneType(title="TI"),
        StoneType(title="TO"),
        StoneType(title="TU"),
        StoneType(title="TS"),
        StoneType(title="TR"),
    ]
)


def bulk_create_stone_color(*args):
    StoneColor.objects.bulk_create(*args)


bulk_create_stone_color(
    [
        StoneColor(title='WH'),
        StoneColor(title='BL'),
        StoneColor(title='BR'),
        StoneColor(title='BU'),
        StoneColor(title='GR'),
        StoneColor(title='PI'),
        StoneColor(title='YE'),
        StoneColor(title='PU'),
        StoneColor(title='RE'),
        StoneColor(title='GO'),
    ]
)


def bulk_create_size(*args):
    Size.objects.bulk_create(*args)


bulk_create_size(
    [
        Size(category=categories[3], measurement="4.70"),
        Size(category=categories[3], measurement="4.80"),
        Size(category=categories[3], measurement="4.90"),
        Size(category=categories[3], measurement="5.05"),
        Size(category=categories[3], measurement="5.18"),
        Size(category=categories[3], measurement="5.30"),
        Size(category=categories[3], measurement="5.43"),
        Size(category=categories[3], measurement="5.56"),
        Size(category=categories[3], measurement="5.68"),
        Size(category=categories[3], measurement="5.81"),
        Size(category=categories[3], measurement="5.94"),
        Size(category=categories[3], measurement="6.07"),
        Size(category=categories[3], measurement="6.19"),
        Size(category=categories[2], measurement="15.20"),
        Size(category=categories[2], measurement="16.50"),
        Size(category=categories[2], measurement="17.80"),
        Size(category=categories[2], measurement="19.10"),
        Size(category=categories[2], measurement="20.30"),
        Size(category=categories[2], measurement="21.60"),
        Size(category=categories[1], measurement="40.64"),
        Size(category=categories[1], measurement="43.18"),
        Size(category=categories[1], measurement="45.72"),
        Size(category=categories[1], measurement="50.80"),
        Size(category=categories[1], measurement="55.88"),
        Size(category=categories[1], measurement="60.96"),
        Size(category=categories[1], measurement="81.28"),
        Size(category=categories[1], measurement="91.44"),
        Size(category=categories[1], measurement="182.88"),
    ]
)
