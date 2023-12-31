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

def get_related_objects(main_model, related_model, related_field, related_objects, select_related=False):
    query = related_model.objects

    if select_related:
        query = query.select_related(related_field)
    else:
        query = query.prefetch_related(related_field)

    related_objects = query.filter(**{f'{related_field}__in': related_objects})

    return related_objects

print(get_related_objects())

def get_related_category_objects(jewelries):
    categories = Category.objects. \
        prefetch_related('jewelry_category'). \
        filter(jewelry_category__in=jewelries)

    return categories