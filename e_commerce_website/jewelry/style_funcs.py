from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import Style, JewelryMetal, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices


def get_style_ids(selection_pattern_styles):
    style_titles = Style.objects. \
        filter(title__in=selection_pattern_styles)

    style_ids = get_objects_ids(style_titles)

    return style_ids


def get_related_style_choices(styles):
    style_choices = list(OrderedDict(
        (style.title, style.get_title_display()) for style in styles
    ).items())

    return style_choices


def define_fields_by_style_choice(selection_pattern_styles, jewelries):
    style_ids = get_style_ids(selection_pattern_styles)

    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('metal')

    metal_choices = list(OrderedDict(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    ).items())

    stone_types = JewelryStone.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('stone_type')

    stone_type_choices = list(OrderedDict(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    ).items())

    stone_colors = JewelryStone.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('stone_color')

    stone_color_choices = list(OrderedDict(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    ).items())

    price_choices = show_available_prices(jewelries)

    return metal_choices, stone_type_choices, stone_color_choices, price_choices

