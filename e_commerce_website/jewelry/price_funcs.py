# from _decimal import Decimal
# from collections import OrderedDict
#
# from django.db.models import Q
#
# from e_commerce_website.jewelry.models import Jewelry
#
#
# def show_available_prices(jewelries):
#     all_price_choices = Jewelry.PriceChoices.choices
#
#     jewelries_prices = jewelries.values_list('price', flat=True). \
#         distinct(). \
#         order_by('price')
#
#     prices_choices = []
#
#     for price in jewelries_prices:
#         for value, display in all_price_choices:
#             if price <= float(value.split(',')[1]):
#                 prices_choices.append((value, display))
#                 break
#
#     ordered_price_choices = list(
#         OrderedDict(prices_choices).items())
#
#     return ordered_price_choices
#
#
# def get_query_price(selection_pattern_price):
#     query_price = Q()
#
#     for price in selection_pattern_price:
#         min_price, max_price = map(float, price.split(','))
#         decimal_min_price, decimal_max_price = (Decimal(min_price), Decimal(max_price))
#         query_price |= Q(price__gte=decimal_min_price) & Q(price__lte=decimal_max_price)
#
#     return query_price
#
