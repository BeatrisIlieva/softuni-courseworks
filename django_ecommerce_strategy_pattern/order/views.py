from .models import Order

from .strategies import (DeliveryMethod, execute_setting_delivery_method,)

def checkout(method, user):
    return execute_setting_delivery_method(method, user)
