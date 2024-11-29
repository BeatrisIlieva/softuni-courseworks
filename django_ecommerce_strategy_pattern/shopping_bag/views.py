from django.db.utils import IntegrityError

from .models import ShoppingBag

def add_to_shopping_bag(quantity, size, product, user):
    try:
        ShoppingBag.objects.create(quantity=quantity, size=size, product=product, user=user)
        print(f"{str(product)} successfully added to shopping bag.")
    except IntegrityError as e:
        print(e.args[0])
    
