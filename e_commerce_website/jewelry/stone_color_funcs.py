from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import StoneColor, Style, JewelryMetal, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices


def get_stone_color_ids(selection_pattern_stone_colors):
    stone_color_titles = StoneColor.objects. \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_ids = get_objects_ids(stone_color_titles)

    return stone_color_ids


def define_fields_by_stone_color_choice(selection_pattern_stone_colors, jewelries):
    stone_color_ids = get_stone_color_ids(selection_pattern_stone_colors)

    jewelries = jewelries. \
        filter(jewelry_stones__stone_color_id__in=stone_color_ids)

    styles = Style.objects. \
        prefetch_related('style__jewelry__stone_colors'). \
        filter(style__jewelry__stone_colors__in=stone_color_ids)

    style_choices = set(
        (style.title, style.get_title_display())
        for style in styles
    )

    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry_stones__stone_color__in=stone_color_ids). \
        select_related('metal')

    metal_choices = set(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    )

    stone_types = JewelryStone.objects. \
        prefetch_related('jewelry__stone_types__stone_types'). \
        filter(stone_type__jewelrydetails__stone_colors__in=stone_color_ids)

    stone_type_choices = set(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    )

    price_choices = show_available_prices(jewelries)
    return style_choices, metal_choices, stone_type_choices, price_choices
