from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import Style, JewelryMetal, JewelryStone, JewelryDetails
from e_commerce_website.jewelry.price_funcs import show_available_prices


def get_related_styles(category_id):
    styles = Style.objects. \
        filter(category=category_id). \
        select_related('category')

    return styles


def get_style_ids(selection_pattern_styles):
    style_titles = Style.objects. \
        filter(title__in=selection_pattern_styles)

    style_ids = get_objects_ids(style_titles)

    return style_ids


def get_related_style_choices(styles):
    style_choices = [
        (style.title, style.get_title_display()) for style in styles
    ]

    return style_choices


def define_jewelries_count_before_selected_style(style_ids, jewelries, jewelries_count_by_style):
    for index, style_id in enumerate(style_ids):
        id_for_label = f'id_style_choices_{index}'
        jewelries_count_by_style[id_for_label] = jewelries.prefetch_related('jewelry__style__category').filter(
            jewelry__style=style_id).count()

    return jewelries_count_by_style


def define_jewelries_count_after_selected_style(jewelries, style_ids, jewelries_count_by_style):

    for index, style_id in enumerate(style_ids):
        id_for_label = f'id_style_choices_{index}'

        jewelries_count_by_style[id_for_label] = jewelries.\
            prefetch_related('jewelry__style__category').\
            filter(jewelry__style=style_id).\
            count()

    return jewelries_count_by_style


def define_fields_by_style_choice(selection_pattern_styles, jewelries):
    style_ids = get_style_ids(selection_pattern_styles)

    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('metal')

    metal_choices = set(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    )

    stone_types = JewelryStone.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('stone_type')

    stone_type_choices = set(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    )

    stone_colors = JewelryStone.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('stone_color')

    stone_color_choices = set(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    )

    price_choices = show_available_prices(jewelries)

    return metal_choices, stone_type_choices, stone_color_choices, price_choices, jewelries_count_by_style
