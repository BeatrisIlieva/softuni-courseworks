import os
from _decimal import Decimal
from collections import OrderedDict

import django
from django import forms

from django.db.models import Q, Count, F



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()
from django.db import models

from e_commerce_website.shopping_cart.models import ShoppingCart

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

jewelries_pks_by_quantity = (
    ShoppingCart.objects.filter(jewelry_id__in=[17, 16])
    .annotate(count=F('quantity'))
    .values('jewelry_id' ,'quantity')
)

# jewelries_and_quantities = {}
# jewelries_pks = [16, 17]
# for pk in jewelries_pks:
#     jewelry = Jewelry.objects.get(pk=pk)
#     quantity = ShoppingCart.objects.get(jewelry_id=pk).quantity
#     jewelries_and_quantities[jewelry] = quantity
#
# print(jewelries_and_quantities)

jewelries_pks = ShoppingCart.objects.filter(user_id=2).values_list('jewelry_id', flat=True)

jewelries_by_quantities = {}

for pk in jewelries_pks:
    jewelry = Jewelry.objects.get(pk=pk)
    quantity = ShoppingCart.objects.get(jewelry_id=pk).quantity
    jewelries_by_quantities[jewelry] = quantity


for j, q in jewelries_by_quantities.items():
    print(j)
    print(q)


