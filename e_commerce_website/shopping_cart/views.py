from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.shortcuts import redirect

from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.models import ShoppingCart


@login_required
def add_to_shopping_cart(request, jewelry_pk):
    jewelry = Jewelry.objects.filter(pk=jewelry_pk).get()

    cart_item = ShoppingCart.objects.get(jewelry_id=jewelry_pk)
    quantity_as_int = cart_item.quantity

    if quantity_as_int:
        quantity_as_int += 1
        ShoppingCart.objects.filter(jewelry_id=jewelry_pk).update(quantity=quantity_as_int)
    else:
        ShoppingCart.objects.create(user=request.user, jewelry=jewelry, quantity=1)

    return redirect('index-page')



