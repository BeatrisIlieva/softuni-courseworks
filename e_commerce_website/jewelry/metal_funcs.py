from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.mappers import METAL_MAPPER
from e_commerce_website.jewelry.models import Metal, Style, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices


def get_metal_ids(selection_pattern_metals):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_ids = get_objects_ids(metal_titles)

    return metal_ids

def define_jewelries_count_before_selected_metal(metal_ids, jewelries, jewelries_count_by_metal):
    for metal_id in metal_ids:
        id_for_label = METAL_MAPPER[metal_id]
        jewelries_count_by_metal[id_for_label] = jewelries.\
            prefetch_related('jewelry_metals__metal').\
            filter(jewelry_metals__metal_id=metal_id).\
            count()

    return jewelries_count_by_metal

def define_fields_by_metal_choice(selection_pattern_metals, jewelries):
    metal_ids = get_metal_ids(selection_pattern_metals)

    styles = Style.objects. \
        prefetch_related('style__jewelry__jewelry_metals'). \
        filter(style__jewelry__metals__in=metal_ids)

    style_choices = set(
        (style.title, style.get_title_display())
        for style in styles
    )

    stone_types = JewelryStone.objects. \
        prefetch_related('jewelry__stone_types__stone_types'). \
        filter(stone_type__jewelrydetails__metals__in=metal_ids)

    stone_type_choices = set(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    )

    stone_colors = JewelryStone.objects. \
        prefetch_related('jewelry__stone_colors__stone_colors'). \
        filter(stone_color__jewelrydetails__metals__in=metal_ids)

    stone_color_choices = set(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    )

    price_choices = show_available_prices(jewelries)

    return style_choices, stone_type_choices, stone_color_choices, price_choices
