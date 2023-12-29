from _decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.db.models import Sum, F, DecimalField, ExpressionWrapper
from django.shortcuts import redirect, render
from django.views import View

from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.forms import QuantityUpdateForm
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


class ShoppingCartView(View):
    template_name = 'shopping_cart/shopping_cart.html'

    def get_context_data(self):
        if self.request.user.is_authenticated:
            user_pk = self.request.user.pk

            jewelries_pks = ShoppingCart.objects.filter(user_id=user_pk).values_list('jewelry_id', flat=True)

            jewelries_by_quantities = {}

            for pk in jewelries_pks:
                jewelry = Jewelry.objects.get(pk=pk)
                quantity = ShoppingCart.objects.get(jewelry_id=pk).quantity
                jewelries_by_quantities[jewelry] = quantity


            total_price = ShoppingCart.objects.filter(user_id=user_pk).annotate(
                total=ExpressionWrapper(F('jewelry__price') * F('quantity'), output_field=DecimalField())
            ).aggregate(total_sum=Sum('total')).get('total_sum') or Decimal('0.00')

            context = {
                'total_price': total_price,
                'jewelries_by_quantities': jewelries_by_quantities,
                'quantity_update_form': QuantityUpdateForm()
            }

            return context

    def get(self, request, *args, **kwargs):
        context = self.get_context_data()

        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        quantity_update_form = QuantityUpdateForm(request.POST)

        if quantity_update_form.is_valid():
            jewelry_id = quantity_update_form.cleaned_data['jewelry_id']
            new_quantity = quantity_update_form.cleaned_data['quantity']

            ShoppingCart.objects.filter(user_id=request.user.pk, jewelry_id=jewelry_id).update(
                quantity=new_quantity)

        context = self.get_context_data()

        return render(request, self.template_name, context)
