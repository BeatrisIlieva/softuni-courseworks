from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import Metal, Style, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices

def get_related_metal_choices(metals):
    metal_choices = list(OrderedDict(
        (metal.title, metal.get_title_display())
        for metal in metals
    ).items())

    return metal_choices
def get_metal_ids(selection_pattern_metals):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_ids = get_objects_ids(metal_titles)

    return metal_ids



def define_fields_by_metal_choice(selection_pattern_metals, jewelries):
    metal_ids = get_metal_ids(selection_pattern_metals)

    styles = Style.objects. \
        prefetch_related('style__jewelry__jewelry_metals'). \
        filter(style__jewelry__metals__in=metal_ids)

    style_choices = list(OrderedDict(
        (style.title, style.get_title_display())
        for style in styles
    ).items())

    stone_types = JewelryStone.objects. \
        prefetch_related('jewelry__stone_types__stone_types'). \
        filter(stone_type__jewelrydetails__metals__in=metal_ids)

    stone_type_choices = list(OrderedDict(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    ).items())

    stone_colors = JewelryStone.objects. \
        prefetch_related('jewelry__stone_colors__stone_colors'). \
        filter(stone_color__jewelrydetails__metals__in=metal_ids)

    stone_color_choices = list(OrderedDict(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    ).items())

    price_choices = show_available_prices(jewelries)

    return style_choices, stone_type_choices, stone_color_choices, price_choices
