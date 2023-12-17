import os
from _decimal import Decimal

import django
from django import forms

from django.db.models import Q


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
        
# jewelry = JewelryDetails.objects.filter(pk=1).get()
# customer_gender = jewelry.jewelry.customer_gender.pk
# print(customer_gender)

# style_names = Style.objects.filter(title__in=['ST', 'EN'])
# style_ids = [s.pk for s in style_names]
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


# metals = Style.objects.filter(category=category_pk).select_related('category')
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


metals = JewelryMetal.objects.select_related('metal'). \
    filter(jewelry__jewelry_id__in=[1])

metal_choices = set(
    (metal.metal.title, metal.metal.get_title_display())
    for metal in metals
)



print(metal_choices)







