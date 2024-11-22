# import os
# import django

# # Set up Django
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_ecommerce_strategy_pattern.settings")
# django.setup()

# from django_ecommerce_strategy_pattern.product.models import Color, Description, Earring

# result = Earring.objects.prefetch_related("earrings_color").filter(color__pk=2)

# print(result)