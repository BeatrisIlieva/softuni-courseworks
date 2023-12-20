from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from .common_funcs import get_objects_ids
from .counter_funcs import define_jewelries_count_before_selected_style, \
    define_jewelries_count_before_selected_stone_color, define_jewelries_count_before_selected_metal, \
    define_jewelries_count_before_selected_stone_type
from .forms import JewelryForm
from .metal_funcs import get_metal_ids, define_fields_by_metal_choice, \
    get_related_metal_choices
from .models import JewelryDetails, StoneType, Metal, StoneColor, Style

from django.db.models import Q

from .price_funcs import get_query_price, define_fields_by_price_choice
from .stone_color_funcs import get_stone_color_ids, define_fields_by_stone_color_choice, get_related_stone_color_choices
from .stone_type_funcs import get_stone_type_ids, define_fields_by_stone_type_choice
from .style_funcs import get_related_style_choices, \
    get_style_ids, define_fields_by_style_choice


def display_jewelries(request, customer_gender_id, category_id):
    query_customer_gender = Q(jewelry__customer_gender=customer_gender_id)
    query_category = Q(jewelry__category=category_id)

    jewelries = JewelryDetails.objects. \
        filter(
        query_customer_gender
        &
        query_category
    )

    jewelry_ids = get_objects_ids(jewelries)

    selection_form = JewelryForm(request.GET)

    styles = Style.objects. \
        filter(category=category_id) \
        .prefetch_related('category__jewelry_category__style') \
        .prefetch_related('style__jewelry') \
        .filter(style__jewelry__in=jewelries)

    style_choices = get_related_style_choices(styles)

    selection_form.fields['style_choices'].choices = style_choices

    jewelries_count_by_style = define_jewelries_count_before_selected_style(
        jewelries, styles
    )

    metals = Metal.objects.\
        prefetch_related('jewelrydetails_set__jewelry_metals__metal').\
        filter(jewelrydetails__in=jewelry_ids)

    metal_choices = get_related_metal_choices(metals)

    selection_form.fields['metal_choices'].choices = metal_choices

    jewelries_count_by_metal = define_jewelries_count_before_selected_metal(
        jewelries, metals
    )

    stone_types = StoneType.objects.\
        prefetch_related('jewelrydetails_set__stone_types__stone_types').\
        filter(jewelrydetails__in=jewelry_ids)

    stone_type_choices = get_related_stone_color_choices(stone_types)

    selection_form.fields['stone_type_choices'].choices = stone_type_choices

    jewelries_count_by_stone_type = define_jewelries_count_before_selected_stone_type(
        jewelries, stone_types
    )

    stone_colors = StoneColor.objects.\
        prefetch_related('jewelrydetails_set__stone_colors__stone_colors').\
        filter(jewelrydetails__in=jewelry_ids)

    stone_color_choices = get_related_stone_color_choices(stone_colors)

    selection_form.fields['stone_color_choices'].choices = stone_color_choices

    jewelries_count_by_stone_color = define_jewelries_count_before_selected_stone_color(
        jewelries, stone_colors
    )






    # def update_selection_forms(**kwargs):
    #     if 'style_choices' in kwargs:
    #         selection_form.fields['style_choices'].choices = kwargs['style_choices']
    #
    #     if 'metal_choices' in kwargs:
    #         selection_form.fields['metal_choices'].choices = kwargs['metal_choices']
    #
    #     if 'stone_type_choices' in kwargs:
    #         selection_form.fields['stone_type_choices'].choices = kwargs['stone_type_choices']
    #
    #     if 'stone_color_choices' in kwargs:
    #         selection_form.fields['stone_color_choices'].choices = kwargs['stone_color_choices']
    #
    #     if 'price_choices' in kwargs:
    #         selection_form.fields['order_by_price'].choices = kwargs['price_choices']

    if selection_form.is_valid():

        selection_pattern_price = selection_form.cleaned_data['order_by_price']

        selection_pattern_styles = selection_form.cleaned_data['style_choices']

        selection_pattern_metals = selection_form.cleaned_data['metal_choices']

        selection_pattern_stone_types = selection_form.cleaned_data['stone_type_choices']

        selection_pattern_stone_colors = selection_form.cleaned_data['stone_color_choices']

        if selection_pattern_price:
            jewelries = jewelries.filter(
                get_query_price(
                    selection_pattern_price
                )
            )

            # style_choices, metal_choices, stone_type_choices, stone_color_choices = \
            #     define_fields_by_price_choice(selection_pattern_price, jewelries)
            #
            # update_selection_forms(
            #     style_choices=style_choices,
            #     metal_choices=metal_choices,
            #     stone_type_choices=stone_type_choices,
            #     stone_color_choices=stone_color_choices,
            # )

        if selection_pattern_styles:
            jewelries = jewelries.filter(
                jewelry__style_id__in=get_style_ids(
                    selection_pattern_styles
                )
            )

            # metal_choices, stone_type_choices, stone_color_choices, price_choices = \
            #     define_fields_by_style_choice(selection_pattern_styles, jewelries)
            #
            # update_selection_forms(
            #     price_choices=price_choices,
            #     metal_choices=metal_choices,
            #     stone_type_choices=stone_type_choices,
            #     stone_color_choices=stone_color_choices,
            # )

        if selection_pattern_metals:
            jewelries = jewelries.filter(
                jewelry_metals__metal_id__in=get_metal_ids(
                    selection_pattern_metals
                )
            )

            # style_choices, stone_type_choices, stone_color_choices, price_choices = \
            #     define_fields_by_metal_choice(selection_pattern_metals, jewelries)
            #
            # update_selection_forms(
            #     price_choices=price_choices,
            #     style_choices=style_choices,
            #     stone_type_choices=stone_type_choices,
            #     stone_color_choices=stone_color_choices,
            # )

        if selection_pattern_stone_types:
            jewelries = jewelries.filter(
                jewelry_stones__stone_type_id__in=get_stone_type_ids(
                    selection_pattern_stone_types
                )
            )

            # style_choices, metal_choices, stone_color_choices, price_choices = \
            #     define_fields_by_stone_type_choice(
            #         selection_pattern_stone_types,
            #         jewelries,
            #     )
            #
            # update_selection_forms(
            #     price_choices=price_choices,
            #     style_choices=style_choices,
            #     metal_choices=metal_choices,
            #     stone_color_choices=stone_color_choices,
            # )

        if selection_pattern_stone_colors:
            jewelries = jewelries.filter(
                jewelry_stones__stone_color_id__in=get_stone_color_ids(
                    selection_pattern_stone_colors
                )
            )

            # style_choices, metal_choices, stone_type_choices, price_choices = \
            #     define_fields_by_stone_color_choice(selection_pattern_stone_colors, jewelries)
            #
            # update_selection_forms(
            #     price_choices=price_choices,
            #     style_choices=style_choices,
            #     metal_choices=metal_choices,
            #     stone_type_choices=stone_type_choices,
            # )

    context = {
        'jewelries': jewelries,
        'form': selection_form,
        'jewelries_count_by_style': jewelries_count_by_style,
        'jewelries_count_by_stone_type': jewelries_count_by_stone_type,
        'jewelries_count_by_metal': jewelries_count_by_metal,
        'jewelries_count_by_stone_color': jewelries_count_by_stone_color,
    }

    nav_bar_context = get_nav_bar_context()

    context.update(nav_bar_context)

    return render(request, 'jewelry/jewelries.html', context)


def show_jewelry_details(request, jewelry_id):
    jewelry = JewelryDetails.objects. \
        filter(id=jewelry_id).get()

    context = {
        'jewelry': jewelry,
    }

    nav_bar_context = get_nav_bar_context()

    context.update(nav_bar_context)

    return render(request, 'jewelry/jewelry_details.html', context)
