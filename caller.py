import os
from _decimal import Decimal
from collections import OrderedDict

import django
from django import forms

from django.db.models import Q, Count, F



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()
from django.db import models

from e_commerce_website.order.forms import CardDetailsForm

from e_commerce_website.shopping_cart.models import ShoppingCart
from e_commerce_website.jewelry.funcs import get_objects_pks
from django.utils.translation import gettext_lazy as _
from e_commerce_website.jewelry.models import (
    Category,
    GoldCaratWeight,
    Jewelry,
    Metal,
    Size,
    StoneColor,
    StoneType,
    JewelryMetal,
    JewelryStone
)

categories = Category.objects.all()
sizes = Size.objects.all()
names = Category.TitleChoices.names
values = Category.TitleChoices.values




# a = [c.get_title_display() for c in jewelries[0].stone_colors.all()]

jewelries = Jewelry.objects.all()

jewelry = jewelries[2]

jewelry_stones = jewelry.jewelry_stones.all()

stone_info_dict = {}

for jewelry_stone in jewelry_stones:
    stone_color = jewelry_stone.stone_color.get_title_display()
    stone_type = jewelry_stone.stone_type.get_title_display()


    stone_info_dict[stone_color] =stone_type

metal_info_dict = {}
jewelry_metals = jewelry.jewelry_metals.all()
for jewelry_metal in jewelry_metals:
    metal = jewelry_metal.metal.get_title_display()
    if jewelry_metal.gold_carat:
        gold_carat = jewelry_metal.gold_carat.get_weight_display()
    else:
        continue

    metal_info_dict[metal] = gold_carat
print(metal_info_dict)

