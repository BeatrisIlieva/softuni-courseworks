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

# metal_choices = list(OrderedDict(
#     (metal.title, metal.get_title_display())
#     for metal in metals
# ).items())
#
# print(metal_choices)

#
# found = [word.lower() in choice.lower() for word in search for _, choice in metal_choices]


search = 'platinum'
options = [(metal.title, metal.get_title_display()) for metal in metals if search in metal.get_title_display().lower() or search in metal.get_title_display()]
valid_options = [o[0] for o in options]
print(valid_options)

metal_titles = Metal.objects. \
    filter(title__in=valid_options)

print(metal_titles)

metal_ids = [m.id for m in metal_titles]
print(metal_ids)

jewelries = jewelries.filter(
    jewelry_metals__metal_id__in=metal_ids
)
print(jewelries)