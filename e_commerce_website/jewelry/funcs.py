from _decimal import Decimal
from collections import OrderedDict

from django.db.models import Q

from e_commerce_website.jewelry.models import \
    Jewelry, \
    Category, \
    Metal, \
    StoneType, \
    StoneColor, \
    Size


def get_objects_pks(objects):
    return [o.pk for o in objects]


def update_selection_forms(selection_form, **kwargs):
    if 'category_choices' in kwargs:
        selection_form.fields['category_choices']. \
            choices = kwargs['category_choices']

    if 'price_choices' in kwargs:
        selection_form.fields['price_choices']. \
            choices = kwargs['price_choices']

    if 'metal_choices' in kwargs:
        selection_form.fields['metal_choices']. \
            choices = kwargs['metal_choices']

    if 'stone_type_choices' in kwargs:
        selection_form.fields['stone_type_choices']. \
            choices = kwargs['stone_type_choices']

    if 'stone_color_choices' in kwargs:
        selection_form.fields['stone_color_choices']. \
            choices = kwargs['stone_color_choices']

    if 'size_choices' in kwargs:
        selection_form.fields['size_choices']. \
            choices = kwargs['size_choices']


def display_jewelries_after_selection(selection_form, jewelries):
    categories = get_related_category_objects(jewelries)

    jewelries_count_by_category = \
        define_jewelries_count_by_selected_category(jewelries, categories)

    metals = get_related_metal_objects(jewelries)

    jewelries_count_by_metal = \
        define_jewelries_count_by_selected_metal(jewelries, metals)

    stone_types = get_related_stone_type_objects(jewelries)

    jewelries_count_by_stone_type = \
        define_jewelries_count_by_selected_stone_type(jewelries, stone_types)

    stone_colors = get_related_stone_color_objects(jewelries)

    jewelries_count_by_stone_color = \
        define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)

    jewelries_count_by_price = define_jewelries_count_by_selected_price(jewelries)

    category_choices = get_related_choices(
        categories,
        field_name='title'
    )

    metal_choices = get_related_choices(
        metals,
        field_name='title'
    )

    stone_type_choices = get_related_choices(
        stone_types,
        field_name='title'
    )

    stone_color_choices = get_related_choices(
        stone_colors,
        field_name='title'
    )

    price_choices = show_available_prices(
        jewelries
    )

    update_selection_forms(
        selection_form,
        category_choices=category_choices,
        metal_choices=metal_choices,
        stone_type_choices=stone_type_choices,
        stone_color_choices=stone_color_choices,
        price_choices=price_choices,
    )

    return jewelries_count_by_category, \
        jewelries_count_by_metal, \
        jewelries_count_by_stone_type, \
        jewelries_count_by_stone_color, \
        jewelries_count_by_price


def get_related_choices(objects, field_name):
    choices = list(OrderedDict(
        (getattr(obj, field_name), getattr(obj, f"get_{field_name}_display")())
        for obj in objects
    ).items()
                   )

    return choices


def show_available_prices(jewelries):
    all_price_choices = Jewelry.PriceChoices.choices

    jewelries_prices = jewelries. \
        values_list('price', flat=True). \
        distinct(). \
        order_by('price')

    prices_choices = []

    for price in jewelries_prices:
        for value, display in all_price_choices:
            if price <= float(value.split(',')[1]):
                prices_choices.append((value, display))
                break

    ordered_price_choices = list(
        OrderedDict(prices_choices).items()
    )

    return ordered_price_choices


def get_query_price(selection_pattern_price):
    query_price = Q()

    for price in selection_pattern_price:
        min_price, max_price = map(float, price.split(','))
        decimal_min_price, decimal_max_price = (
            Decimal(min_price), Decimal(max_price)
        )
        query_price |= Q(price__gte=decimal_min_price) & \
                       Q(price__lte=decimal_max_price)

    return query_price


def get_related_category_objects(jewelries):
    categories = Category.objects. \
        prefetch_related('jewelry_category'). \
        filter(jewelry_category__in=jewelries)

    return categories


def get_category_pks(selection_pattern_categories):
    category_titles = Category.objects. \
        filter(title__in=selection_pattern_categories)

    category_pks = get_objects_pks(category_titles)

    return category_pks


def get_related_metal_objects(jewelries):
    metals = Metal.objects. \
        prefetch_related('metals'). \
        filter(jewelry__in=jewelries)

    return metals


def get_metal_pks(selection_pattern_metals):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_pks = get_objects_pks(metal_titles)

    return metal_pks


def get_related_stone_type_objects(jewelries):
    stone_types = StoneType.objects. \
        prefetch_related('stone_types'). \
        filter(jewelry__in=jewelries)

    return stone_types


def get_stone_type_pks(selection_pattern_stone_types):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_pks = get_objects_pks(stone_type_titles)

    return stone_type_pks


def get_related_stone_color_objects(jewelries):
    stone_colors = StoneColor.objects. \
        prefetch_related('stone_colors'). \
        filter(jewelry__in=jewelries)

    return stone_colors


def get_stone_color_pks(selection_pattern_stone_colors):
    stone_color_titles = StoneColor.objects. \
        filter(title__in=selection_pattern_stone_colors)

    stone_color_pks = get_objects_pks(stone_color_titles)

    return stone_color_pks


def get_related_size_objects(jewelry):
    sizes = Size.objects \
        .prefetch_related('category__jewelry_category__size') \
        .filter(sizes__jewelry__exact=jewelry)

    return sizes


def define_jewelries_count_by_selected_category(jewelries, categories):
    jewelries_count_by_category = {}
    for category in categories:
        jewelries_count_by_category[category.get_title_display()] = jewelries. \
            select_related('category'). \
            filter(category_id=category.pk). \
            count()

    return jewelries_count_by_category


def define_jewelries_count_by_selected_metal(jewelries, metals):
    jewelries_count_by_metal = {}
    for metal in metals:
        jewelries_count_by_metal[metal.get_title_display()] = jewelries. \
            prefetch_related('jewelry_metals__metal'). \
            filter(jewelry_metals__metal_id=metal.pk). \
            count()

    return jewelries_count_by_metal


def define_jewelries_count_by_selected_stone_type(jewelries, stone_types):
    jewelries_count_by_stone_type = {}
    for stone_type in stone_types:
        jewelries_count_by_stone_type[stone_type.get_title_display()] = jewelries. \
            prefetch_related('jewelry_stones__stone_type'). \
            filter(jewelry_stones__stone_type_id__exact=stone_type.pk). \
            count()

    return jewelries_count_by_stone_type


def define_jewelries_count_by_selected_stone_color(jewelries, stone_colors):
    jewelries_count_by_stone_color = {}
    for color in stone_colors:
        jewelries_count_by_stone_color[color.get_title_display()] = jewelries. \
            prefetch_related('jewelry_stones__stone_color'). \
            filter(jewelry_stones__stone_color_id__exact=color.pk). \
            count()

    return jewelries_count_by_stone_color


def define_jewelries_count_by_selected_price(jewelries):
    jewelries_count_by_price = {}
    all_price_choices = Jewelry.PriceChoices.choices

    for value, display in all_price_choices:
        min_price, max_price = float(
            value.split(',')[0]), \
            float(value.split(',')[1]
                  )

        decimal_min_price, decimal_max_price = (
            Decimal(min_price),
            Decimal(max_price)
        )

        count = jewelries.filter(
            Q(price__gte=decimal_min_price) &
            Q(price__lte=decimal_max_price)
        ).count()

        if display not in jewelries_count_by_price.keys():
            jewelries_count_by_price[display] = count

        else:
            jewelries_count_by_price[display] += count

    return jewelries_count_by_price
