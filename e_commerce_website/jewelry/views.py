from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from e_commerce_website.jewelry.counter_funcs import define_jewelries_count_before_selected_metal, \
    define_jewelries_count_before_selected_stone_type, define_jewelries_count_before_selected_stone_color, \
    define_jewelries_count_by_price
from e_commerce_website.jewelry.forms import JewelryForm
from e_commerce_website.jewelry.metal_funcs import get_related_metal_objects, get_related_metal_choices, get_metal_ids
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.jewelry.price_funcs import show_available_prices, get_query_price
from e_commerce_website.jewelry.stone_color_funcs import get_related_stone_color_objects, \
    get_related_stone_color_choices, get_stone_color_ids
from e_commerce_website.jewelry.stone_type_funcs import get_related_stone_type_objects, get_related_stone_type_choices, \
    get_stone_type_ids


def update_selection_forms(selection_form, **kwargs):
    if 'price_choices' in kwargs:
        selection_form.fields['order_by_price'].choices = kwargs['price_choices']

    if 'metal_choices' in kwargs:
        selection_form.fields['metal_choices'].choices = kwargs['metal_choices']

    if 'stone_type_choices' in kwargs:
        selection_form.fields['stone_type_choices'].choices = kwargs['stone_type_choices']

    if 'stone_color_choices' in kwargs:
        selection_form.fields['stone_color_choices'].choices = kwargs['stone_color_choices']


def display_jewelries_after_selection(selection_form, jewelries):
    metals = get_related_metal_objects(jewelries)
    jewelries_count_by_metal = define_jewelries_count_before_selected_metal(jewelries, metals)

    stone_types = get_related_stone_type_objects(jewelries)
    jewelries_count_by_stone_type = define_jewelries_count_before_selected_stone_type(jewelries, stone_types)

    stone_colors = get_related_stone_color_objects(jewelries)
    jewelries_count_by_stone_color = define_jewelries_count_before_selected_stone_color(jewelries, stone_colors)

    jewelries_count_by_price = define_jewelries_count_by_price(jewelries)

    metal_choices = get_related_metal_choices(metals)
    stone_type_choices = get_related_stone_type_choices(stone_types)
    stone_color_choices = get_related_stone_color_choices(stone_colors)
    price_choices = show_available_prices(jewelries)

    update_selection_forms(
        selection_form,
        metal_choices=metal_choices,
        stone_type_choices=stone_type_choices,
        stone_color_choices=stone_color_choices,
        price_choices=price_choices,
    )

    return jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price


def display_jewelries(request, category_id):
    jewelries = Jewelry.objects. \
        filter(category=category_id)

    selection_form = JewelryForm(request.GET)

    jewelries_count_by_price = define_jewelries_count_by_price(jewelries)

    metals = get_related_metal_objects(jewelries)
    jewelries_count_by_metal = define_jewelries_count_before_selected_metal(jewelries, metals)

    stone_types = get_related_stone_type_objects(jewelries)
    jewelries_count_by_stone_type = define_jewelries_count_before_selected_stone_type(jewelries, stone_types)

    stone_colors = get_related_stone_color_objects(jewelries)
    jewelries_count_by_stone_color = define_jewelries_count_before_selected_stone_color(jewelries, stone_colors)

    metal_choices = get_related_metal_choices(metals)
    stone_type_choices = get_related_stone_type_choices(stone_types)
    stone_color_choices = get_related_stone_color_choices(stone_colors)
    price_choices = show_available_prices(jewelries)

    update_selection_forms(
        selection_form,
        metal_choices=metal_choices,
        stone_type_choices=stone_type_choices,
        stone_color_choices=stone_color_choices,
        price_choices=price_choices,
    )

    if selection_form.is_valid():

        selection_pattern_price = selection_form.cleaned_data['order_by_price']

        selection_pattern_metals = selection_form.cleaned_data['metal_choices']

        selection_pattern_stone_types = selection_form.cleaned_data['stone_type_choices']

        selection_pattern_stone_colors = selection_form.cleaned_data['stone_color_choices']

        if selection_pattern_price:
            jewelries = jewelries.filter(
                get_query_price(
                    selection_pattern_price
                )
            )

            jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                display_jewelries_after_selection(selection_form, jewelries)

        if selection_pattern_metals:
            jewelries = jewelries.filter(
                jewelry_metals__metal_id__in=get_metal_ids(
                    selection_pattern_metals
                )
            )

            jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                display_jewelries_after_selection(selection_form, jewelries)

        if selection_pattern_stone_types:
            jewelries = jewelries.filter(
                jewelry_stones__stone_type_id__in=get_stone_type_ids(
                    selection_pattern_stone_types
                )
            )

            jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                display_jewelries_after_selection(selection_form, jewelries)

        if selection_pattern_stone_colors:
            jewelries = jewelries.filter(
                jewelry_stones__stone_color_id__in=get_stone_color_ids(
                    selection_pattern_stone_colors
                )
            )

            jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                display_jewelries_after_selection(selection_form, jewelries)

    context = {
        'jewelries': jewelries,
        'category_id': category_id,
        'form': selection_form,
        'jewelries_count_by_stone_type': jewelries_count_by_stone_type,
        'jewelries_count_by_metal': jewelries_count_by_metal,
        'jewelries_count_by_stone_color': jewelries_count_by_stone_color,
        'jewelries_count_by_price': jewelries_count_by_price,
    }

    nav_bar_context = get_nav_bar_context()

    context.update(nav_bar_context)

    return render(request, 'jewelry/jewelries.html', context)


def show_jewelry_details(request, jewelry_id, category_id):
    jewelry = Jewelry.objects. \
        filter(id=jewelry_id).get()

    context = {
        'jewelry': jewelry,
    }

    nav_bar_context = get_nav_bar_context()

    context.update(nav_bar_context)

    return render(request, 'jewelry/jewelry_details.html', context)
