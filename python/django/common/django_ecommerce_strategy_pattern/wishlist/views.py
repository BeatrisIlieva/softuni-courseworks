from django.db.utils import IntegrityError

from .models import Wishlist


def add_to_wishlist(product, user):
    try:
        Wishlist.objects.create(product=product, user=user)
        print(f"{str(product)} successfully added to Wishlist.")
    except IntegrityError as e:
        print(e.args[0])
