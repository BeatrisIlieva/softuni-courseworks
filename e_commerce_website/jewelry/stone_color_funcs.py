from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import StoneColor, Style, JewelryMetal, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices

def get_related_stone_color_objects(jewelries):
    jewelry_ids = get_objects_ids(jewelries)
    stone_colors = StoneColor.objects. \
        prefetch_related('jewelrydetails_set__stone_colors__stone_colors'). \
        filter(jewelrydetails__in=jewelry_ids)

    return stone_colors
def get_related_stone_color_choices(stone_colors):
    stone_color_choices = list(OrderedDict(
        (color.title, color.get_title_display()) for color in stone_colors
    ).items())

    return stone_color_choices

def get_stone_color_ids(selection_pattern_stone_colors):
    stone_color_titles = StoneColor.objects. \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_ids = get_objects_ids(stone_color_titles)

    return stone_color_ids


def define_fields_by_stone_color_choice(selection_pattern_stone_colors, jewelries):
    stone_color_ids = get_stone_color_ids(selection_pattern_stone_colors)

    jewelry_ids = get_objects_ids(jewelries)

    jewelries = jewelries. \
        filter(jewelry_stones__stone_color_id__in=stone_color_ids)

    styles = Style.objects. \
        prefetch_related('style__jewelry__stone_colors'). \
        filter(style__jewelry__stone_colors__in=stone_color_ids)

    style_choices = list(OrderedDict(
        (style.title, style.get_title_display())
        for style in styles
    ).items())

    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry_stones__stone_color__in=stone_color_ids). \
        select_related('metal')

    metal_choices = list(OrderedDict(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    ).items())

    stone_types = JewelryStone.objects. \
        prefetch_related('jewelry__stone_types__stone_types'). \
        filter(stone_type__jewelrydetails__stone_colors__in=stone_color_ids)

    stone_type_choices = list(OrderedDict(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    ).items())

    price_choices = show_available_prices(jewelries)

    stone_colors = StoneColor.objects. \
        prefetch_related('jewelrydetails_set__stone_colors__stone_colors'). \
        filter(jewelrydetails__in=jewelry_ids)

    stone_color_choices = get_related_stone_color_choices(stone_colors)

    return style_choices, metal_choices, stone_type_choices, price_choices, stone_color_choices
