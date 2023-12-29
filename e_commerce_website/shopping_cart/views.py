from _decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.db.models import Sum, F
from django.shortcuts import redirect
from django.views.generic import TemplateView

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

    return redirect('view_shopping_cart')


class ShoppingCartView(TemplateView):
    template_name = 'shopping_cart/shopping_cart.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.request.user.is_authenticated:
            user_pk = self.request.user.pk

            jewelries_pks = ShoppingCart.objects.filter(user_id=user_pk).values_list('jewelry_id', flat=True)

            jewelries_by_quantities = {}

            for pk in jewelries_pks:
                jewelry = Jewelry.objects.get(pk=pk)
                quantity = ShoppingCart.objects.get(jewelry_id=pk).quantity
                jewelries_by_quantities[jewelry] = quantity

            total_price_as_dict = Jewelry.objects.filter(id__in=jewelries_pks).aggregate(total_price=Sum('price'))

            total_price = Decimal(total_price_as_dict['total_price'])
            context['jewelries_by_quantities'] = jewelries_by_quantities
            context['total_price'] = total_price

            return context






