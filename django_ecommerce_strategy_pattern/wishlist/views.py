from .models import Wishlist

from django.core.exceptions import ValidationError

def add_to_wishlist(product, user):
    try:
        Wishlist.objects.create(product=product, user=user)
    except ValidationError as e:
        print(e.messages[0])
