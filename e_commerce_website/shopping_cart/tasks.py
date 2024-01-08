from datetime import timedelta

from celery import shared_task
from django.db.models import F
from django.utils import timezone

from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.models import ShoppingCart


@shared_task
def cleanup_expired_carts():
    # expiration_time = timezone.now() - timedelta(minutes=1)

    expired_carts = ShoppingCart.objects.filter(
        # created_at__lt=expiration_time,
        order_completed=False,
    )

    for cart in expired_carts:
        jewelry_pk = cart.jewelry_id
        quantity = cart.quantity
        Jewelry.objects.filter(pk=jewelry_pk).update(quantity=F('quantity') + quantity)
        # jewelry = Jewelry.objects.get(pk=jewelry_pk)
        # jewelry.quantity += quantity
        # jewelry.save()
        print(cart)
        cart.delete()

