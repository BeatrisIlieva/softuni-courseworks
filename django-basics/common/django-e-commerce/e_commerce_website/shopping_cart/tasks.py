from celery import shared_task
from django.db.models import F

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.shopping_cart.models import ShoppingCart


@shared_task
def cleanup_expired_carts():
    expired_carts = ShoppingCart.objects.filter(

        order_completed=False,
    )

    for cart in expired_carts:
        jewelry_pk = cart.jewelry_id
        quantity = cart.quantity
        Inventory.objects.filter(jewelry_id=jewelry_pk).update(quantity=F('quantity') + quantity)

        cart.delete()
