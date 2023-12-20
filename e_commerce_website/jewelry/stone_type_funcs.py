from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import StoneType, Style, JewelryMetal, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices

def get_related_stone_color_choices(stone_types):
    stone_type_choices = list(OrderedDict(
        (stone_type.title, stone_type.get_title_display()) for stone_type in stone_types
    ).items())

    return stone_type_choices

def get_stone_type_ids(selection_pattern_stone_types):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_ids = get_objects_ids(stone_type_titles)

    return stone_type_ids


def define_fields_by_stone_type_choice(
        selection_pattern_stone_types,
        jewelries,
):
    stone_type_ids = get_stone_type_ids(selection_pattern_stone_types)

    jewelries = jewelries. \
        filter(jewelry_stones__stone_type_id__in=stone_type_ids)

    styles = Style.objects. \
        prefetch_related('style__jewelry__stone_types'). \
        filter(style__jewelry__stone_types__in=stone_type_ids)

    style_choices = list(OrderedDict(
        (style.title, style.get_title_display())
        for style in styles
    ).items())


    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry_stones__stone_type__in=stone_type_ids). \
        select_related('metal')

    metal_choices = list(OrderedDict(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    ).items())

    stone_colors = JewelryStone.objects. \
        prefetch_related('jewelry__stone_colors__stone_colors'). \
        filter(stone_color__jewelrydetails__stone_types__in=stone_type_ids)

    stone_color_choices = list(OrderedDict(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    ).items())

    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_color_choices, price_choices

