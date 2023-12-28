from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect

from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.models import ShoppingCart


@login_required
def add_to_shopping_cart(request, jewelry_pk):
    jewelry = Jewelry.objects.filter(pk=jewelry_pk).get()
    ShoppingCart.objects.create(user=request.user, jewelry=jewelry)

    return redirect('index-page')



