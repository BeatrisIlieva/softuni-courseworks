from _decimal import Decimal
from collections import OrderedDict

from django.db.models import Q

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import JewelryDetails, Style, JewelryMetal, JewelryStone, Metal


def show_available_prices(jewelries):
    all_price_choices = JewelryDetails.PriceChoices.choices

    jewelries_prices = jewelries.values_list('price', flat=True). \
        distinct(). \
        order_by('price')

    prices_choices = []

    for price in jewelries_prices:
        for value, display in all_price_choices:
            if price <= float(value.split(',')[1]):
                prices_choices.append((value, display))
                break

    return prices_choices


def get_query_price(selection_pattern_price):
    query_price = Q()

    for price in selection_pattern_price:
        min_price, max_price = map(float, price.split(','))
        decimal_min_price, decimal_max_price = (Decimal(min_price), Decimal(max_price))
        query_price |= Q(price__gte=decimal_min_price) & Q(price__lte=decimal_max_price)

    return query_price


def define_fields_by_price_choice(jewelries):

    jewelry_ids = get_objects_ids(jewelries)
    print(jewelries)
    styles = Style.objects. \
        prefetch_related('category__jewelry_category__style') \
        .filter(style__jewelry__in=jewelry_ids)

    style_choices = list(OrderedDict(
        (style.title, style.get_title_display())
        for style in styles
    ).items())

    # metals = JewelryMetal.objects.select_related('jewelry'). \
    #     filter(jewelry_id__in=jewelry_ids)

    metals = Metal.objects.prefetch_related('jewelrydetails_set__jewelry_metals__metal'). \
        filter(jewelrydetails__in=jewelry_ids)

    print(metals)

    metal_choices = list(OrderedDict(
        (metal.title, metal.get_title_display())
        for metal in metals
    ).items())

    stone_types = JewelryStone.objects. \
        filter(jewelry__in=jewelry_ids). \
        select_related('stone_type')

    stone_type_choices = list(OrderedDict(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    ).items())

    stone_colors = JewelryStone.objects. \
        filter(jewelry__in=jewelry_ids). \
        select_related('stone_color')

    stone_color_choices = list(OrderedDict(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    ).items())

    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices
