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

def get_related_choices(objects, field_name):
    choices = list(OrderedDict(
        (getattr(obj, field_name), getattr(obj, f"get_{field_name}_display")())
        for obj in objects
    ).items())

    return choices


print(get_related_choices(sizes, 'measurement'))

def get_related_choices(objects, field_name):
    choices = list(OrderedDict(
        (getattr(obj, field_name), getattr(obj, f"get_{field_name}_display")())
        for obj in objects
    ).items())

    return choices


print(get_related_choices(categories, 'title'))