import os
from _decimal import Decimal

import django
from django import forms

from django.db.models import Q, Count

from e_commerce_website.jewelry.common_funcs import get_objects_ids

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()
from django.db import models

from django.utils.translation import gettext_lazy as _
from e_commerce_website.jewelry.models import (
    Category,
    CustomerGender,
    GoldCaratWeight,
    Jewelry,
    JewelryDetails,
    Metal,
    Size,
    StoneColor,
    StoneType,
    Style,
    Title, JewelryMetal, JewelryStone
)

categories = Category.objects.all()
titles = Title.objects.all()
sizes = Size.objects.all()
styles = Style.objects.all()
# metals = Metal.objects.all()
gold_carats = GoldCaratWeight.objects.all()
customer_genders = CustomerGender.objects.all()
jewelries = Jewelry.objects.all()
jewelries_by_details = JewelryDetails.objects.all()
stone_types = StoneType.objects.all()
stone_colors = StoneColor.objects.all()

# categories_choices = [x[1] for x in Category.TitleChoices.choices]

# print(categories_choices)

# categories_by_choices = {}

# index = 0

# for category in categories:
#     categories_by_choices[category] = categories_choices[index]
#     index += 1

# print(categories_by_choices)

# jewelry = JewelryDetails.objects.filter(id=1).get()
# customer_gender = jewelry.jewelry.customer_gender.id
# print(customer_gender)

# style_names = Style.objects.filter(title__in=['ST', 'EN'])
# style_ids = [s.id for s in style_names]
# print(style_ids)

# jewelries = JewelryDetails.objects.filter(Q(jewelry__customer_gender=1),
#                                           Q(jewelry__category=1))
#
# # jewelries = jewelries.prefetch_related('metals__metals__jewelry').filter(metals__title='YG')
# jewelries = jewelries.prefetch_related('metals__metals__jewelry').filter(jewelry__style__in=[2])
# jewelries = jewelries.filter(jewelry__style__in=[2])
# # metals = JewelryMetal.objects.prefetch_related('jewelry').filter(jewelry__jewelry__style__in=[2]).select_related('metal')
# metals = JewelryMetal.objects.prefetch_related('jewelry').filter(jewelry__jewelry__style__in=[2]).select_related('metal')
#
# print(metals)
# # metal_choice = Metal.TitleChoices.labels['WG']
# # print(metal_choice)
# print(metals.values_list('metal__title', flat=True))


# Fetch all the metals from the database
# metals = JewelryMetal.objects.filter(metal__title='WG').select_related('metal')
# metal_choices = [(metal.metal.TitleChoices.choices) for metal in metals][0]


# metal_field = forms.ChoiceField(choices=metal_choices)


# metals = JewelryDetails.objects.filter(jewelry__style=1).prefetch_related('metals')
# # metal_choices = [(metal.title, metal.get_title_display()) for metal in metals]
# metal_choices = [(metal.metal.TitleChoices.choices) for metal in metals][0]
# print(metals)
# print(metal_choices)

# metals = Metal.objects.prefetch_related('metals__jewelry__metals')
# metal_choices = [(metal.title, metal.get_title_display()) for metal in metals]
# print(metal_choices)
# # print(metal_choices)
#
# metals = JewelryMetal.objects.filter(jewelry__jewelry__style=2).select_related('metal')
# metal_choices = [(metal.metal, metal.get_metal_display()) for metal in metals]
# print(metal_choices)

# styles = Style.objects.filter(category=1).select_related('category')
# style_choices = [(style.title, style.get_title_display()) for style in styles]
# # style_choices = [(style.TitleChoices.choices) for style in styles][0]
# print(style_choices)
# print(styles)

# styles = Jewelry.objects.select_related('style').filter(category=1)
# style_choices = [(style.style.TitleChoices.choices) for style in styles][0]
# print(style_choices)
# print(styles)


# metals = Style.objects.filter(category=category_id).select_related('category')
# style_choices = [(style.title, style.get_title_display()) for style in styles]

# metals = JewelryMetal.objects.filter(jewelry__jewelry__style=2).select_related('metal')
# metal_choices = [(metal.metal.title, metal.metal.get_title_display()) for metal in metals]
# print(metals)
# print(metal_choices)


# jewelries = JewelryDetails.objects.filter(
#     Q(jewelry__customer_gender=1),
#     Q(jewelry__category=1),
# )


# styles = Style.objects.prefetch_related('style__jewelry__jewelry_metals').filter(style__jewelry__metals__in=[1, 3])
#
# style_choices = [(style.title, style.get_title_display()) for style in styles]
# print(style_choices)

# stones = JewelryStone.objects.filter(jewelry__jewelry__style_id__in=[1, 2]).select_related('stone_type')
# print(stones)
# stone_choices = set((stone.title, stone.get_title_display()) for stone in stones)

# stones = JewelryStone.objects.filter(jewelry__jewelry__style_id__in=[1]).select_related('stone_type')
# stone_choices = set((stone_type.stone_type.title, stone_type.stone_type.get_title_display()) for stone_type in stones)
# print(stone_choices)

# class JewelryForm(forms.Form):
#     PRICE_CHOICES = (
#         ((0, 750), '$0-$749.99'),
#         ((750, 1500), '$750-$1499.99'),
#         ((1500, 3000), '$1500-$2999.99'),
#         ((3000, 5000), '$3000-$4999.99'),
#         ((5000, 100000), 'Above$5000'),
#     )
#
#     order_by_price = forms.MultipleChoiceField(
#         choices=PRICE_CHOICES,
#         required=False,
#         widget=forms.CheckboxSelectMultiple,
#     )
#
# price_choices = []
# for el in JewelryForm.PRICE_CHOICES:
#     jewelries = JewelryDetails.objects.all(). \
#         filter(Q(price__gte=el[0][0]) & Q(price__lte=el[0][1]))
#     if jewelries:
#        price_choices.extend(el[0])
# print(price_choices)


# class PriceChoices(models.TextChoices):
#     V_750 = '0, 750', _('$0-$749.99')
#     V_1500 = '750, 1500', _('$750-$1499.99')
#     V_3000 = '1500, 3000', _('$1500-$2999.99')
#     V_5000 = '3000, 5000', _('$3000-$4999.99')
#     V_100000 = '5000, 10000', _('Above$5000')


# jewelries = JewelryDetails.objects.filter(
#     Q(price__gte=JewelryDetails.PriceChoices.V_750[0]) &
#     Q(price__lte=JewelryDetails.PriceChoices.V_750[1]))
# print(jewelries)
# print(jewelry)
# jewelries = JewelryDetails.objects.filter(
#     Q(price__gte=JewelryDetails.PriceChoices.V_750[0]) &
#     Q(price__lte=JewelryDetails.PriceChoices.V_750[1]))

# jewelries = JewelryDetails.objects.filter(price__range=(int(JewelryDetails.PriceChoices.V_750.title()[0]), int(JewelryDetails.PriceChoices.V_750.title()[1])))
# print(jewelries)
# all_price_choices = JewelryDetails.PriceChoices.choices
#
# filtered_price_choices = [
#         (value, display) for value, display in all_price_choices
#         if float(value.split(',')[1]) <= 2000
#     ]
#
# print(filtered_price_choices)


#     # Filter choices based on the maximum price among the three products
# max_price = 13000
#
# filtered_price_choices = [
#     (value, display) for value, display in all_price_choices
#     if float(value.split(',')[1]) <= 2000
# ]
#
# for price, display in all_price_choices:
#     print(float(price.split(',')[1]))
# all_price_choices = JewelryDetails.PriceChoices.choices
# price_filters = Q()
#
# for price, display in all_price_choices:
#     price_filters |= Q(price__lte=(float(price.split(',')[1])))
#
# jewelries = JewelryDetails.objects.all()
#
# jewelries = jewelries.filter(price_filters)
# jewelries_prices = []
#
# for jewelry in jewelries:
#     jewelries_prices.append(jewelry.price)
#
# filtered_price_choices = [
#             (value, display) for value, display in all_price_choices
#             if float(value.split(',')[1]) >= 750 or float(value.split(',')[1]) >= 1500
#         ]
# print(filtered_price_choices)

# all_price_choices = JewelryDetails.PriceChoices.choices
#
# # jewelries_prices = set()
# # for jewelry in jewelries_by_details:
# #     jewelries_prices.add(jewelry.price)
# jewelries_prices = jewelries_by_details.values_list('price', flat=True).distinct().order_by('price')
# prices = []
# for price in jewelries_prices:
#     for value, display in all_price_choices:
#         if price <= float(value.split(',')[1]):
#             prices.append((value, display))
#             break
# # print(prices)
#
# min_price
#
# jewelries_by_details = jewelries_by_details.filter(price__lte)


# metals = JewelryMetal.objects.prefetch_related('metal'). \
#     filter(jewelry__jewelry_id__in=[2])
#
# metal_choices = set(
#     (metal.metal.title, metal.metal.get_title_display())
#     for metal in metals
# )
#
#
#
# print(metal_choices)
#
# all_styles = Style.TitleChoices.choices
#
# style_choices = []
# jewelries = jewelries.prefetch_related('jewelry__style__category_id').filter(jewelry__in=jewelry_ids)
# for value, display in all_styles:
#     if price <= float(value.split(',')[1]):
#         prices.append((value, display))
#         break

# metals = JewelryMetal.objects.select_related('metal'). \
#     filter(jewelry__metals__in=[3])
#
# metal_choices = set(
#     (metal.metal.title, metal.metal.get_title_display())
#     for metal in metals
# )
#
# print(metal_choices)


# metals = JewelryMetal.objects.select_related('jewelry'). \
#     filter(jewelry_id__in=[1, 2, 3])
#
# metal_choices = [
#     (metal.metal.title, metal.metal.get_title_display())
#     for metal in metals
# ]
#
# print(metal_choices)

# styles = Style.objects. \
#     prefetch_related('category__jewelry_category__style') \
#     .filter(style__jewelry__in=[2])
#
# style_choices = [
#     (style.title, style.get_title_display())
#     for style in styles
# ]
#
# print(style_choices)
# jewelries = jewelries_by_details
# def get_objects_ids(objects):
#     return [o.id for o in objects]
#
#
# def show_available_prices(jewelries):
#     all_price_choices = JewelryDetails.PriceChoices.choices
#
#     jewelries_prices = jewelries.values_list('price', flat=True).distinct().order_by('price')
#
#     prices = []
#
#     for price in jewelries_prices:
#         for value, display in all_price_choices:
#             if price <= float(value.split(',')[1]):
#                 prices.append((value, display))
#                 break
#
#     return (prices)
#
#
# def show_jewelries_by_price(selection_pattern_price, jewelries):
#     query_price = Q()
#
#     for price in selection_pattern_price:
#         min_price, max_price = map(float, price.split(','))
#         decimal_min_price, decimal_max_price = (Decimal(min_price), Decimal(max_price))
#         query_price |= Q(price__gte=decimal_min_price) & Q(price__lte=decimal_max_price)
#
#     jewelries = jewelries.filter(query_price)
#
#     jewelry_ids = get_objects_ids(jewelries)
#
#     styles = Style.objects. \
#         prefetch_related('category__jewelry_category__style') \
#         .filter(style__jewelry__in=jewelry_ids)
#
#     style_choices = set(
#         (style.title, style.get_title_display())
#         for style in styles
#     )
#
#     # metals = JewelryMetal.objects.select_related('metal'). \
#     #     filter(jewelry__metals__in=jewelry_ids)
#
#     # metals = JewelryMetal.objects.prefetch_related('jewelry__metals__metals'). \
#     #     filter(jewelry__jewelry_id__in=jewelry_ids)
#
#     metals = JewelryMetal.objects.select_related('jewelry'). \
#         filter(jewelry_id__in=jewelry_ids)
#
#     metal_choices = set(
#         (metal.metal.title, metal.metal.get_title_display())
#         for metal in metals
#     )
#
#     stone_types = JewelryStone.objects. \
#         filter(jewelry__in=jewelry_ids). \
#         select_related('stone_type')
#
#     stone_type_choices = set(
#         (stone_type.stone_type.title, stone_type.stone_type.get_title_display())
#         for stone_type in stone_types
#     )
#
#     stone_colors = JewelryStone.objects. \
#         filter(jewelry__in=jewelry_ids). \
#         select_related('stone_color')
#
#     stone_color_choices = set(
#         (stone_color.stone_color.title, stone_color.stone_color.get_title_display())
#         for stone_color in stone_colors
#     )
#
#     price_choices = show_available_prices(jewelries)
#     print(price_choices)
#     return jewelries, style_choices, metal_choices, stone_type_choices, stone_color_choices, price_choices
#
#
# print(show_jewelries_by_price(['5000, 1_000_000'], jewelries))
# annotate(num_jewelries=Count('jewelries'))

# counter = jewelries_by_details.prefetch_related('jewelry__style__category').filter(jewelry__style__in=[1, 2]).count()
# print(counter)
#
# jewelries_count = {}
# cur_styles = Style.objects. \
#     filter(category=1). \
#     select_related('category')
# style_ids = [s.id for s in cur_styles]
# for style_id in style_ids:
#     if style_id not in jewelries_count.keys():
#         jewelries_count[style_id] = jewelries_by_details.prefetch_related('jewelry__style__category').filter(
#             jewelry__style=style_id).count()
#     else:
#         jewelries_count[style_id] += jewelries_by_details.prefetch_related('jewelry__style__category').filter(
#             jewelry__style=style_id).count()
#
# print(jewelries_count)
# print(cur_styles)
#
# counter_j = jewelries_by_details.prefetch_related('jewelry__style__category').filter(jewelry__style=1).count()
# print(counter_j)
#
# {% for key, value in jewelries_count_by_style.items %}
#                             {% if subfield.name == 'style_choices' %}
#                                 {{ subfield }}
#                             <span>{{ value }}</span>
#                             {% endif %}
#                         {% endfor %}


# cur_jewelries = JewelryDetails.objects .\
#         prefetch_related('jewelry_stones__stone_color'). \
#         filter(jewelry_metals__metal_id=3). \
#         count()
#
# print(cur_jewelries)

# cur_jewelries = JewelryDetails.objects .\
#         prefetch_related('jewelry_stones__stone_color'). \
#         filter(jewelry_stones__stone_color_id__exact=5). \
#         count()
#
# print(cur_jewelries)

# cur_jewelries = JewelryDetails.objects .\
#         prefetch_related('metals__metals__jewelry'). \
#         filter(jewelry_metals__metal_id__exact=2). \
#         count()
#
# print(cur_jewelries)

# cur_jewelries = JewelryDetails.objects.filter(pk=3).\
#     prefetch_related('metals__metals__jewelry'). \
#     prefetch_related('jewelry_stones__stone_type'). \
#     filter(Q(jewelry_metals__metal_id__exact=3) & Q(jewelry_stones__stone_type__in=[8, 3])). \
#     count()
#
# print(cur_jewelries)


# cur_metals = JewelryMetal.objects.filter(
#     Q(jewelry_id__in=[1, 2, 3] )
#     & Q(metal_id=3)
#     & Q(jewelry__stone_types__in=[3, 8])).count()
#
# print(cur_metals)
#
# jewelries_count_by_metal[id_for_label] = JewelryMetal.objects.filter(
#     Q(jewelry_id__in=jewelries_ids)
#     & Q(metal_id=metal_id)
#     & Q(jewelry__stone_types__in=stone_type_ids)).count(

# JEWELRIES_COUNT_BY_STYLE = {
#     1: 'Drop',
#     2: 'Hoop',
#     3: 'Stud'
# }
# current_dict = {}
# JEWELRIES_COUNT_BY_STYLE[1]['count'] += 1
# current_dict.update({1:JEWELRIES_COUNT_BY_STYLE[1]['count']})
# print(JEWELRIES_COUNT_BY_STYLE)
# print(current_dict)

current_jewelries_count_by_style = {}
style_ids = [1, 2, 3]

def get_related_styles(category_id):
    styles = Style.objects. \
        filter(category=category_id). \
        select_related('category')

    return styles


def get_related_style_choices(styles):
    style_choices = [
        (style.title, style.get_title_display()) for style in styles
    ]

    return style_choices

def define_jewelries_count_before_selected_style(jewelries_by_details):
    current_jewelries_count_by_style = {}
    styles = get_related_styles(1)
    for style in styles:
        current_jewelries_count_by_style[style.get_title_display()] = jewelries_by_details.\
            prefetch_related('jewelry__style__category').\
            filter(jewelry__style=style.id).\
            count()
    # print(styles)
    # style_labels = [s.get_title_display() for s in styles]
    # print(style_labels)

    # for label in style_labels:
    #     current_jewelries_count_by_style.update(
    #         {
    #             label: jewelries_by_details.
    #             prefetch_related('jewelry__style__category').
    #             filter(jewelry__style=key).
    #             count()
    #         }
    #     )

    return current_jewelries_count_by_style



# colors = StoneColor.objects.prefetch_related('jewelrydetails_set__stone_colors__stone_colors').filter(jewelrydetails__in=[1,2,3])
# print([s.title for s in colors])
#
# metals = JewelryMetal.objects.select_related('jewelry'). \
#     filter(jewelry__metals__in=[1,2,3])
# metal_choices = [(metal.metal.title, metal.metal.get_title_display()) for metal in metals]
#
# print(metal_choices)

# cur_styles = Style.objects.filter(category=1).select_related('category')

cur_styles = Style.objects. \
    filter(category=1)\
    .prefetch_related('category__jewelry_category__style')\
    .prefetch_related('style__jewelry')\
    .filter(style__jewelry__in=[1, 2, 3, 4])

print(cur_styles)