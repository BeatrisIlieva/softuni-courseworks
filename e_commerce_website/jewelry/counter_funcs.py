from _decimal import Decimal

from django.db.models import Q

from e_commerce_website.jewelry.models import Jewelry

def define_jewelries_count_before_selected_metal(jewelries, metals):
    jewelries_count_by_metal = {}
    for metal in metals:
        jewelries_count_by_metal[metal.get_title_display()] = jewelries. \
            prefetch_related('jewelry_metals__metal'). \
            filter(jewelry_metals__metal_id=metal.id). \
            count()

    return jewelries_count_by_metal


def define_jewelries_count_before_selected_stone_type(jewelries, stone_types):
    jewelries_count_by_stone_type = {}
    for stone_type in stone_types:
        jewelries_count_by_stone_type[stone_type.get_title_display()] = jewelries. \
            prefetch_related('jewelry_stones__stone_type'). \
            filter(jewelry_stones__stone_type_id__exact=stone_type.id). \
            count()

    return jewelries_count_by_stone_type


def define_jewelries_count_before_selected_stone_color(jewelries, stone_colors):
    jewelries_count_by_stone_color = {}
    for color in stone_colors:
        jewelries_count_by_stone_color[color.get_title_display()] = jewelries. \
            prefetch_related('jewelry_stones__stone_color'). \
            filter(jewelry_stones__stone_color_id__exact=color.id). \
            count()

    return jewelries_count_by_stone_color


def define_jewelries_count_by_price(jewelries):
    jewelries_count_by_price = {}
    all_price_choices = Jewelry.PriceChoices.choices

    for value, display in all_price_choices:
        min_price, max_price = float(value.split(',')[0]), float(value.split(',')[1])
        decimal_min_price, decimal_max_price = (Decimal(min_price), Decimal(max_price))
        count = jewelries.filter(Q(price__gte=decimal_min_price) & Q(price__lte=decimal_max_price)).count()
        if display not in jewelries_count_by_price.keys():
            jewelries_count_by_price[display] = count
        else:
            jewelries_count_by_price[display] += count

    return jewelries_count_by_price
