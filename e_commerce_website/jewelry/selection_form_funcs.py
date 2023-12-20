from e_commerce_website.jewelry.counter_funcs import define_jewelries_count_before_selected_style, \
    define_jewelries_count_before_selected_metal, define_jewelries_count_before_selected_stone_type, \
    define_jewelries_count_before_selected_stone_color, define_jewelries_count_by_price
from e_commerce_website.jewelry.metal_funcs import get_related_metal_objects, get_related_metal_choices
from e_commerce_website.jewelry.price_funcs import show_available_prices
from e_commerce_website.jewelry.stone_color_funcs import get_related_stone_color_objects, \
    get_related_stone_color_choices
from e_commerce_website.jewelry.stone_type_funcs import get_related_stone_type_objects, get_related_stone_type_choices
from e_commerce_website.jewelry.style_funcs import get_related_styles_objects, get_related_style_choices

def update_selection_forms(selection_form, **kwargs):

    if 'price_choices' in kwargs:
        selection_form.fields['order_by_price'].choices = kwargs['price_choices']

    if 'style_choices' in kwargs:
        selection_form.fields['style_choices'].choices = kwargs['style_choices']

    if 'metal_choices' in kwargs:
        selection_form.fields['metal_choices'].choices = kwargs['metal_choices']

    if 'stone_type_choices' in kwargs:
        selection_form.fields['stone_type_choices'].choices = kwargs['stone_type_choices']

    if 'stone_color_choices' in kwargs:
        selection_form.fields['stone_color_choices'].choices = kwargs['stone_color_choices']

def display_jewelries_after_selection(selection_form, jewelries, styles, metals, stone_types, stone_colors):
    styles = get_related_styles_objects(jewelries)
    jewelries_count_by_style = define_jewelries_count_before_selected_style(jewelries, styles)

    metals = get_related_metal_objects(jewelries)
    jewelries_count_by_metal = define_jewelries_count_before_selected_metal(jewelries, metals)

    stone_types = get_related_stone_type_objects(jewelries)
    jewelries_count_by_stone_type = define_jewelries_count_before_selected_stone_type(jewelries, stone_types)

    stone_colors = get_related_stone_color_objects(jewelries)
    jewelries_count_by_stone_color = define_jewelries_count_before_selected_stone_color(jewelries, stone_colors)

    jewelries_count_by_price = define_jewelries_count_by_price(jewelries)

    style_choices = get_related_style_choices(styles)
    metal_choices = get_related_metal_choices(metals)
    stone_type_choices = get_related_stone_type_choices(stone_types)
    stone_color_choices = get_related_stone_color_choices(stone_colors)
    price_choices = show_available_prices(jewelries)

    update_selection_forms(
        selection_form,
        metal_choices=metal_choices,
        style_choices=style_choices,
        stone_type_choices=stone_type_choices,
        stone_color_choices=stone_color_choices,
        price_choices=price_choices,
    )

    return jewelries_count_by_style, jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price
