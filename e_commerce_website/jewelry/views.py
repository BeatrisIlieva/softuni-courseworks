import re
from decimal import Decimal

from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from .forms import JewelryForm
from .models import JewelryDetails, Style, Metal, JewelryMetal, JewelryStone, StoneType, StoneColor, Jewelry

from django.db.models import Q


def get_objects_pks(objects):
    return [o.pk for o in objects]


def show_available_prices(jewelries):
    all_price_choices = JewelryDetails.PriceChoices.choices

    jewelries_prices = jewelries.values_list('price', flat=True).distinct().order_by('price')

    prices = []

    for price in jewelries_prices:
        for value, display in all_price_choices:
            if price <= float(value.split(',')[1]):
                prices.append((value, display))
                break

    return (prices)


def show_jewelries_by_price(selection_pattern_price, jewelries):
    query_price = Q()

    for price in selection_pattern_price:
        min_price, max_price = map(float, price.split(','))
        decimal_min_price, decimal_max_price = (Decimal(min_price), Decimal(max_price))
        query_price |= Q(price__gte=decimal_min_price) & Q(price__lte=decimal_max_price)

    jewelries = jewelries.filter(query_price)

    jewelry_ids = get_objects_pks(jewelries)

    styles = Style.objects. \
        prefetch_related('category__jewelry_category__style') \
        .filter(style__jewelry__in=jewelry_ids)

    style_choices = set(
        (style.title, style.get_title_display())
        for style in styles
    )

    # metals = JewelryMetal.objects.select_related('metal'). \
    #     filter(jewelry__metals__in=jewelry_ids)

    # metals = JewelryMetal.objects.prefetch_related('jewelry__metals__metals'). \
    #     filter(jewelry__jewelry_id__in=jewelry_ids)

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
    return jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries_by_style(selection_pattern_styles, jewelries):
    # Filtering the `style_titles` - (objects) from the `Style` table, based on the selection
    style_titles = Style.objects. \
        filter(title__in=selection_pattern_styles)

    # Getting the pks of the style objects
    style_ids = get_objects_pks(style_titles)

    # Filtering the `JewelryDetails` objects based on the style pks in the `Jewelry` table
    jewelries = jewelries. \
        filter(jewelry__style_id__in=style_ids)

    # `JewelryMetal` has a foreign key to `JewelryDetails` which has a foreign key to `Jewelry`
    # where the style pk is stored. Thus, we take the objects from the `JewelryMetal` that have
    # a pk of the respective `Jewelry` and filter the possible metals based on the selected style
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
    return jewelries, metal_choices, stone_type_choices, stone_color_choices, style_choices, price_choices


def show_jewelries_by_metals(selection_pattern_metals, jewelries):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_ids = get_objects_pks(metal_titles)

    jewelries = jewelries. \
        filter(jewelry_metals__metal_id__in=metal_ids)

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
    return jewelries, style_choices, stone_type_choices, stone_color_choices, metal_choices, price_choices


def show_jewelries_by_stone_types(selection_pattern_stone_types, jewelries):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_ids = get_objects_pks(stone_type_titles)

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

    stone_types = StoneType.objects.\
        prefetch_related('stone_types__jewelry__stone_types').\
        filter(title__in=selection_pattern_stone_types)


    stone_type_choices = set(
        (stone.title, stone.get_title_display())
        for stone in stone_types
    )

    price_choices = show_available_prices(jewelries)
    return jewelries, style_choices, metal_choices, stone_color_choices, stone_type_choices, price_choices


def show_jewelries_by_stone_colors(selection_pattern_stone_colors, jewelries):
    stone_color_titles = StoneColor.objects. \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_ids = get_objects_pks(stone_color_titles)

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

    stone_colors = StoneColor.objects.\
        prefetch_related('stone_colors__jewelry__stone_colors').\
        filter(title__in=selection_pattern_stone_colors)


    stone_color_choices = set(
        (stone.title, stone.get_title_display())
        for stone in stone_colors
    )
    price_choices = show_available_prices(jewelries)
    return jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices


def show_jewelries(request, customer_gender_pk, category_pk):
    jewelries = JewelryDetails.objects. \
        filter(
        Q(jewelry__customer_gender=customer_gender_pk)
        &
        Q(jewelry__category=category_pk)
    )

    selection_form = JewelryForm(request.GET)

    def update_selection_forms(*args):
        selection_form.fields['style_choices'].choices = style_choices
        selection_form.fields['metal_choices'].choices = metal_choices
        selection_form.fields['stone_type_choices'].choices = stone_type_choices
        selection_form.fields['stone_color_choices'].choices = stone_color_choices
        selection_form.fields['order_by_price'].choices = price_choices


    if selection_form.is_valid():

        # Getting the styles from the `Style` model and filtering them based on the selected category
        styles = Style.objects. \
            filter(category=category_pk). \
            select_related('category')

        # Filtering the `style_choices` from the form based on the `styles`
        style_choices = [
            (style.title, style.get_title_display()) for style in styles
        ]

        # Changing the form fields based on the new `style_choices`
        selection_form.fields['style_choices'].choices = style_choices

        # Defining all possible selection patterns
        selection_pattern_price = selection_form.cleaned_data['order_by_price']
        selection_pattern_styles = selection_form.cleaned_data['style_choices']
        selection_pattern_metals = selection_form.cleaned_data['metal_choices']
        selection_pattern_stone_types = selection_form.cleaned_data['stone_type_choices']
        selection_pattern_stone_colors = selection_form.cleaned_data['stone_color_choices']

        if selection_pattern_price:
            jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                show_jewelries_by_price(selection_pattern_price, jewelries)

            update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices)


        if selection_pattern_styles:
            jewelries, metal_choices, stone_type_choices, stone_color_choices, style_choices, price_choices = \
                show_jewelries_by_style(selection_pattern_styles, jewelries)

            update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices)

        if selection_pattern_metals:
            jewelries, style_choices, stone_type_choices, stone_color_choices, metal_choices, price_choices = \
                show_jewelries_by_metals(selection_pattern_metals, jewelries)

            update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices)

        if selection_pattern_stone_types:
            jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                show_jewelries_by_stone_types(selection_pattern_stone_types, jewelries)

            update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices)

        if selection_pattern_stone_colors:
            jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices = \
                show_jewelries_by_stone_colors(selection_pattern_stone_colors, jewelries)

            update_selection_forms(jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices)

    context = {
        'jewelries': jewelries,
        'form': selection_form,
    }

    nav_bar_context = get_nav_bar_context()

    context.update(nav_bar_context)

    return render(request, 'jewelry/jewelries.html', context)


def show_jewelry_details(request, jewelry_pk):
    jewelry = JewelryDetails.objects. \
        filter(pk=jewelry_pk).get()

    context = {
        'jewelry': jewelry,
    }

    nav_bar_context = get_nav_bar_context()

    context.update(nav_bar_context)

    return render(request, 'jewelry/jewelry_details.html', context)
