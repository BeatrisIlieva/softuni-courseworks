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
from e_commerce_website.order.models import Order, OrderProducts
categories = Category.objects.all()
sizes = Size.objects.all()
metals = Metal.objects.all()
gold_carats = GoldCaratWeight.objects.all()
jewelries = Jewelry.objects.all()
stone_types = StoneType.objects.all()
stone_colors = StoneColor.objects.all()

jewelries_count_by_category = {}
for category in categories:
    jewelries_count_by_category[category.get_title_display()] = jewelries. \
        select_related('category'). \
        filter(category_id=category.id). \
        count()

print(jewelries_count_by_category)