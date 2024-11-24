import os
import django


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "django_ecommerce_strategy_pattern.settings"
)
django.setup()


from django_ecommerce_strategy_pattern.product.strategies import (
    get_entity_details,
    FiltrationMethod,
)


print(get_entity_details(2, 2, FiltrationMethod.FULL_DETAILS))
