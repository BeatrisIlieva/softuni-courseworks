from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.counter_funcs import define_jewelries_count_before_selected_metal
from e_commerce_website.jewelry.models import Style, JewelryMetal, JewelryStone, Metal
from e_commerce_website.jewelry.price_funcs import show_available_prices


def get_related_styles_objects(jewelries):
    styles = Style.objects \
        .prefetch_related('category__jewelry_category__style') \
        .filter(style__jewelry__in=jewelries)

    return styles


def get_related_style_choices(styles):
    style_choices = list(OrderedDict(
        (style.title, style.get_title_display()) for style in styles
    ).items())

    return style_choices


def get_style_ids(selection_pattern_styles):
    style_titles = Style.objects. \
        filter(title__in=selection_pattern_styles)

    style_ids = get_objects_ids(style_titles)

    return style_ids
