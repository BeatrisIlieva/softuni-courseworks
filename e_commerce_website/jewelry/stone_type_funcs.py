from django.db.models import Q

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.mappers import STONE_TYPE_MAPPER, STYLE_MAPPER
from e_commerce_website.jewelry.models import StoneType, Style, JewelryMetal, JewelryStone
from e_commerce_website.jewelry.price_funcs import show_available_prices


def get_stone_type_ids(selection_pattern_stone_types):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_ids = get_objects_ids(stone_type_titles)

    return stone_type_ids


def define_jewelries_count_before_selected_stone_type(stone_type_ids, jewelries, jewelries_count_by_stone_type):
    for stone_type_id in stone_type_ids:
        id_for_label = STONE_TYPE_MAPPER[stone_type_id]
        jewelries_count_by_stone_type[id_for_label] = jewelries. \
            prefetch_related('jewelry_stones__stone_type'). \
            filter(jewelry_stones__stone_type_id__exact=stone_type_id) \
            .count()

    return jewelries_count_by_stone_type


def define_fields_by_stone_type_choice(selection_pattern_stone_types, jewelries, jewelries_count_by_style):
    stone_type_ids = get_stone_type_ids(selection_pattern_stone_types)

    jewelries = jewelries. \
        filter(jewelry_stones__stone_type_id__in=stone_type_ids)

    styles = Style.objects. \
        prefetch_related('style__jewelry__stone_types'). \
        filter(style__jewelry__stone_types__in=stone_type_ids)

    style_choices = set(
        (style.title, style.get_title_display())
        for style in styles
    )

    style_ids = get_objects_ids(styles)

    jewelries_count_by_style = \
        define_jewelries_style_count_after_selected_stone_type(jewelries, style_ids, stone_type_ids,
                                                               jewelries_count_by_style)

    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry_stones__stone_type__in=stone_type_ids). \
        select_related('metal')

    metal_choices = set(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    )

    stone_colors = JewelryStone.objects. \
        prefetch_related('jewelry__stone_colors__stone_colors'). \
        filter(stone_color__jewelrydetails__stone_types__in=stone_type_ids)

    stone_color_choices = set(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    )

    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_color_choices, price_choices, jewelries_count_by_style


def define_jewelries_style_count_after_selected_stone_type(jewelries, style_ids, stone_type_ids,
                                                           jewelries_count_by_style):
    for style_id in style_ids:
        id_for_label = STYLE_MAPPER[style_id]

        jewelries_count_by_style[id_for_label] = jewelries. \
            prefetch_related('jewelry__style__category'). \
            prefetch_related('jewelry_stones__stone_type'). \
            filter(Q(jewelry__style=style_id) & Q(jewelry_stones__stone_type_id__in=stone_type_ids)). \
            count()

    return jewelries_count_by_style
