from django.core.exceptions import ValidationError


from .factories import get_product_set


def generate_product_set(method):
    try:
        return get_product_set(method)
    except ValidationError as e:
        print(e.messages)
