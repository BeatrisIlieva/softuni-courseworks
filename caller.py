import os
from _decimal import Decimal
from collections import OrderedDict

import django
from django import forms

from django.db.models import Q, Count


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()
from django.db import models

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
metals = Metal.objects.all()
gold_carats = GoldCaratWeight.objects.all()
jewelries = Jewelry.objects.all()
stone_types = StoneType.objects.all()
stone_colors = StoneColor.objects.all()

categories_choices = [x[1] for x in Category.TitleChoices.choices]

# categories_by_choices = {}
#
# index = 0
#
# for category in categories:
#     categories_by_choices[category] = categories_choices[index]
#     index += 1
#
# my_dict = {'b': 2, 'a': 1, 'c': 3}
#
# sorted_items = sorted(my_dict.items(), key=lambda x: x[1])  # Sort items based on values
#
# sorted_dict = {k: v for k, v in sorted_items}  # Reconstruct dictionary from sorted items
# print(sorted_dict)

jewelry = jewelries.filter(pk=1)
print(jewelry)

def get_related_size_objects(jewelry):
    sizes = Size.objects \
        .prefetch_related('category__jewelry_category__size') \
        .filter(sizes__jewelry__in=jewelry)

    return sizes

print(get_related_size_objects(jewelry))
cur_sizes = get_related_size_objects(jewelry)



def get_related_size_choices(sizes):
    size_choices = list(OrderedDict(
        (size.measurement, size.get_measurement_display()) for size in sizes
    ).items())

    return size_choices

print(get_related_size_choices(cur_sizes))





