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

user_pk = 1

context = {}

order_details = {}

orders = Order.objects.filter(user_id=user_pk)

# for order in orders:
#
#     order_details[order.pk] = {'status': order.get_status_display()}
#
#     order_products = OrderProducts.objects.filter(order_id=order.pk)
#
#     for order_product in order_products:
#         jewelry = Jewelry.objects.get(pk=order_product.jewelry_id)
#         quantity = order_product.quantity
#         price = jewelry.price
#         total_price_per_jewelry = price * quantity
#         total_order_price = order_product.total_price
#         order_details[order.pk].update(
#             {
#                 'jewelry': jewelry,
#                 'price': price,
#                 'quantity': quantity,
#                 'total_price': total_price_per_jewelry,
#                 'total_order_price': total_order_price,
#             }
#         )
#
#
#
#         context.update(order_details)
#
# print(context)
#
# order_details = {}

orders = Order.objects.filter(user_id=user_pk)

for order in orders:
    order_details[order.pk] = {
        'status': order.get_status_display(),
        'order_products': []
    }

    order_products = OrderProducts.objects.filter(order_id=order.pk)

    for order_product in order_products:
        jewelry = Jewelry.objects.get(pk=order_product.jewelry_id)
        quantity = order_product.quantity
        price = jewelry.price
        total_price_per_jewelry = price * quantity
        total_order_price = order_product.total_price

        order_details[order.pk]['order_products'].append({
            'jewelry': jewelry,
            'price': price,
            'quantity': quantity,
            'total_price': total_price_per_jewelry,
            'total_order_price': total_order_price,
        })

order_details = order_details

print(order_details)


