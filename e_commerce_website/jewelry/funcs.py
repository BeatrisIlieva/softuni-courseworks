from _decimal import Decimal
from collections import OrderedDict


from django.db.models import Q

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import \
    Jewelry, \
    Category, \
    Metal, \
    StoneType, \
    StoneColor, \
    Size, JewelryStone


def get_objects_pks(objects):
    return [o.pk for o in objects]


def get_related_choices(objects, field_name):
    choices = list(OrderedDict(
        (getattr(obj, field_name), getattr(obj, f"get_{field_name}_display")())
        for obj in objects
    ).items()
                   )

    return choices






def get_query_price(selection_pattern_price):
    query_price = Q()

    for price in selection_pattern_price:
        min_price, max_price = map(float, price.split(','))
        decimal_min_price, decimal_max_price = (
            Decimal(min_price), Decimal(max_price)
        )
        query_price |= Q(inventory__price__gte=decimal_min_price) & \
                       Q(inventory__price__lte=decimal_max_price)

    return query_price


def get_category_pks(selection_pattern_categories):
    category_titles = Category.objects. \
        filter(title__in=selection_pattern_categories)

    category_pks = get_objects_pks(category_titles)

    return category_pks


def get_metal_pks(selection_pattern_metals):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_pks = get_objects_pks(metal_titles)

    return metal_pks


def get_stone_type_pks(selection_pattern_stone_types):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_pks = get_objects_pks(stone_type_titles)

    return stone_type_pks


def get_stone_color_pks(selection_pattern_stone_colors):
    stone_color_titles = StoneColor.objects. \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_pks = get_objects_pks(stone_color_titles)

    return stone_color_pks


def get_related_size_objects(jewelry):
    sizes = Size.objects \
        .prefetch_related('category__jewelry_category__size') \
        .filter(sizes__jewelry__exact=jewelry)

    return sizes
