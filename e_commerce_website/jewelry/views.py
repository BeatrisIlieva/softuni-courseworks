import re
from decimal import Decimal

from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from .forms import JewelryForm
from .models import JewelryDetails, Style, Metal, JewelryMetal, JewelryStone, StoneType, StoneColor, Jewelry

from django.db.models import Q

def show_style_choices(category_id):
    styles = Style.objects. \
        filter(category=category_id). \
        select_related('category')

    style_choices = [
        (style.title, style.get_title_display()) for style in styles
    ]

    return style_choices


def show_available_prices(jewelries):
    all_price_choices = JewelryDetails.PriceChoices.choices

    jewelries_prices = jewelries.values_list('price', flat=True). \
        distinct(). \
        order_by('price')

    prices_choices = []

    for price in jewelries_prices:
        for value, display in all_price_choices:
            if price <= float(value.split(',')[1]):
                prices_choices.append((value, display))
                break

    return prices_choices

def get_query_price(selection_pattern_price):
    query_price = Q()

    for price in selection_pattern_price:
        min_price, max_price = map(float, price.split(','))
        decimal_min_price, decimal_max_price = (Decimal(min_price), Decimal(max_price))
        query_price |= Q(price__gte=decimal_min_price) & Q(price__lte=decimal_max_price)

    return query_price
def get_objects_ids(objects):
    return [o.id for o in objects]

def get_style_ids(selection_pattern_styles):
    # Filtering the `style_titles` - (objects) from the `Style` table, based on the selection
    style_titles = Style.objects. \
        filter(title__in=selection_pattern_styles)

    # Getting the ids of the style objects
    style_ids = get_objects_ids(style_titles)

    return style_ids


def get_metal_ids(selection_pattern_metals):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_ids = get_objects_ids(metal_titles)

    return metal_ids


def get_stone_type_ids(selection_pattern_stone_types):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_ids = get_objects_ids(stone_type_titles)

    return stone_type_ids


def get_stone_color_ids(selection_pattern_stone_colors):
    stone_color_titles = StoneColor.objects. \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_ids = get_objects_ids(stone_color_titles)

    return stone_color_ids

def show_jewelries_by_price(selection_pattern_price, jewelries):
    jewelry_ids = get_objects_ids(jewelries)

    styles = Style.objects. \
        prefetch_related('category__jewelry_category__style') \
        .filter(style__jewelry__in=jewelry_ids)

    style_choices = set(
        (style.title, style.get_title_display())
        for style in styles
    )

    metals = JewelryMetal.objects.select_related('jewelry'). \
        filter(jewelry_id__in=jewelry_ids)

    metal_choices = set(
        (metal.metal.title, metal.metal.get_title_display())
        for metal in metals
    )

    stone_types = JewelryStone.objects. \
        filter(jewelry__in=jewelry_ids). \
        select_related('stone_type')

    stone_type_choices = set(
        (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
        for stone_type in stone_types
    )

    stone_colors = JewelryStone.objects. \
        filter(jewelry__in=jewelry_ids). \
        select_related('stone_color')

    stone_color_choices = set(
        (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
        for stone_color in stone_colors
    )

    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries_by_style(selection_pattern_styles, jewelries):
    style_ids = get_style_ids(selection_pattern_styles)

    metals = JewelryMetal.objects. \
        filter(jewelry__jewelry__style_id__in=style_ids). \
        select_related('metal')

    # Because the objects might be more than one, we use set()
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
    styles = Style.objects. \
        filter(title__in=selection_pattern_styles)

    style_choices = set(
        (style.title, style.get_title_display())
        for style in styles
    )

    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries_by_metals(selection_pattern_metals, jewelries):
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

    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_choices = set(
        (metal.title, metal.get_title_display())
        for metal in metal_titles
    )
    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries_by_stone_types(selection_pattern_stone_types, jewelries):

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

    stone_types = StoneType.objects. \
        prefetch_related('stone_types__jewelry__stone_types'). \
        filter(title__in=selection_pattern_stone_types)

    stone_type_choices = set(
        (stone.title, stone.get_title_display())
        for stone in stone_types
    )

    price_choices = show_available_prices(jewelries)

    return style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries_by_stone_colors(selection_pattern_stone_colors, jewelries):

    stone_color_ids = get_stone_color_ids(selection_pattern_stone_colors)

    jewelries = jewelries. \
        filter(jewelry_stones__stone_color_id__in=stone_color_ids)

    styles = Style.objects. \
        prefetch_related('style__jewelry__stone_types'). \
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

    stone_colors = StoneColor.objects. \
        prefetch_related('stone_colors__jewelry__stone_colors'). \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_choices = set(
        (stone.title, stone.get_title_display())
        for stone in stone_colors
    )
    price_choices = show_available_prices(jewelries)
    return style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries(request, customer_gender_id, category_id):
    query_customer_gender = Q(jewelry__customer_gender=customer_gender_id)
    query_category = Q(jewelry__category=category_id)

    jewelries = JewelryDetails.objects. \
        filter(
        query_customer_gender
        &
        query_category
    )

    selection_form = JewelryForm(request.GET)

    selection_form.fields['style_choices'].choices = show_style_choices(category_id)

    def update_selection_forms(**kwargs):
        if 'style_choices' in kwargs:
            selection_form.fields['style_choices'].choices = kwargs['style_choices']
        if 'metal_choices' in kwargs:
            selection_form.fields['metal_choices'].choices = kwargs['metal_choices']
        if 'stone_type_choices' in kwargs:
            selection_form.fields['stone_type_choices'].choices = kwargs['stone_type_choices']
        if 'stone_color_choices' in kwargs:
            selection_form.fields['stone_color_choices'].choices = kwargs['stone_color_choices']
        if 'price_choices' in kwargs:
            selection_form.fields['order_by_price'].choices = kwargs['price_choices']

    if selection_form.is_valid():

        selection_pattern_price = selection_form.cleaned_data['order_by_price']
        selection_pattern_styles = selection_form.cleaned_data['style_choices']
        selection_pattern_metals = selection_form.cleaned_data['metal_choices']
        selection_pattern_stone_types = selection_form.cleaned_data['stone_type_choices']
        selection_pattern_stone_colors = selection_form.cleaned_data['stone_color_choices']

        query_price = get_query_price(selection_pattern_price)
        query_style = Q(
            jewelry__style_id__in=get_style_ids(selection_pattern_styles)
        )
        query_metal = Q(
            jewelry_metals__metal_id__in=get_metal_ids(selection_pattern_metals)
        )
        query_stone_type = Q(
            jewelry_stones__stone_type_id__in=get_stone_type_ids(selection_pattern_stone_types)
        )
        query_stone_color = Q(
            jewelry_stones__stone_color_id__in=get_stone_color_ids(selection_pattern_stone_colors))

        if selection_pattern_price:

            jewelries = jewelries.filter(
                query_price)

            style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                show_jewelries_by_price(selection_pattern_price, jewelries)

            update_selection_forms(
                style_choices=style_choices,
                metal_choices=metal_choices,
                stone_type_choices=stone_type_choices,
                stone_color_choices=stone_color_choices,
            )

            if selection_pattern_styles:

                jewelries = jewelries.filter(
                    query_style
                )

                style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices= \
                    show_jewelries_by_style(selection_pattern_styles, jewelries)

                update_selection_forms(
                    style_choices=style_choices,
                    metal_choices=metal_choices,
                    stone_type_choices=stone_type_choices,
                    stone_color_choices=stone_color_choices,
                )


            if selection_pattern_metals:

                jewelries = jewelries.filter(
                    query_metal
                )

                style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                    show_jewelries_by_metals(selection_pattern_metals, jewelries)

                update_selection_forms(
                    style_choices=style_choices,
                    metal_choices=metal_choices,
                    stone_type_choices=stone_type_choices,
                    stone_color_choices=stone_color_choices,
                )



            if selection_pattern_stone_types:
                jewelries = jewelries.filter(
                    query_stone_type
                )

                style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                    show_jewelries_by_stone_types(selection_pattern_stone_types, jewelries)

                update_selection_forms(
                    style_choices=style_choices,
                    metal_choices=metal_choices,
                    stone_type_choices=stone_type_choices,
                    stone_color_choices=stone_color_choices,
                )


            if selection_pattern_stone_colors:
                jewelries = jewelries.filter(
                    query_stone_color
                )

                style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                    show_jewelries_by_stone_colors(selection_pattern_stone_types, jewelries)

                update_selection_forms(
                    style_choices=style_choices,
                    metal_choices=metal_choices,
                    stone_type_choices=stone_type_choices,
                    stone_color_choices=stone_color_choices,
                )


        # jewelries = jewelries.filter(
        #         query_price
        #         &
        #         query_style
        #         &
        #         query_metal
        #         &
        #         query_stone_type
        #         &
        #         query_stone_color
        #     )


    # def update_selection_forms(*args):
    #     selection_form.fields['style_choices'].choices = style_choices
    #     selection_form.fields['metal_choices'].choices = metal_choices
    #     selection_form.fields['stone_type_choices'].choices = stone_type_choices
    #     selection_form.fields['stone_color_choices'].choices = stone_color_choices
    #     selection_form.fields['order_by_price'].choices = price_choices
    #
    #
    #     if selection_pattern_price:
    #         jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
    #             show_jewelries_by_price(selection_pattern_price, jewelries)
    #
    #         update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices,
    #                                price_choices)
    #
    #     if selection_pattern_styles:
    #         jewelries, metal_choices, stone_type_choices, stone_color_choices, style_choices, price_choices = \
    #             show_jewelries_by_style(selection_pattern_styles, jewelries)
    #
    #         update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices,
    #                                price_choices)
    #
    #     if selection_pattern_metals:
    #         jewelries, style_choices, stone_type_choices, stone_color_choices, metal_choices, price_choices = \
    #             show_jewelries_by_metals(selection_pattern_metals, jewelries)
    #
    #         update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices,
    #                                price_choices)
    #
    #     if selection_pattern_stone_types:
    #         jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
    #             show_jewelries_by_stone_types(selection_pattern_stone_types, jewelries)
    #
    #         update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices,
    #                                price_choices)
    #
    #     if selection_pattern_stone_colors:
    #         jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
    #             show_jewelries_by_stone_colors(selection_pattern_stone_colors, jewelries)
    #
    #         update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices,
    #                                price_choices)

    context = {
        'jewelries': jewelries,
        'form': selection_form,
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
