import os
from _decimal import Decimal

import django
from django import forms

from django.db.models import Q, Count


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
metals = Metal.objects.all()
gold_carats = GoldCaratWeight.objects.all()
customer_genders = CustomerGender.objects.all()
jewelries = Jewelry.objects.all()
jewelries_by_details = JewelryDetails.objects.all()
stone_types = StoneType.objects.all()
stone_colors = StoneColor.objects.all()

