from _decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.db.models import Sum, F, DecimalField, ExpressionWrapper
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView, UpdateView

from e_commerce_website.accounts.models import AccountProfile
from e_commerce_website.accounts.views import UserUpdateView
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.forms import QuantityUpdateForm
from e_commerce_website.shopping_cart.models import ShoppingCart


def remove_quantity_from_inventory(jewelry, quantity):
    if quantity <= jewelry.quantity:
        jewelry.quantity -= quantity
        if jewelry.quantity == 0:
            jewelry.sold_out = True
        jewelry.save()


def add_quantity_to_inventory(jewelry, quantity, max_quantity):
    if jewelry.quantity + quantity <= max_quantity:
        jewelry.quantity += quantity
        jewelry.sold_out = False
        jewelry.save()


@login_required
def add_to_shopping_cart(request, jewelry_pk):
    customer_shopping_cart_pk = ShoppingCart.objects.filter(user_id=request.user.pk, jewelry_id=jewelry_pk)
    jewelry = Jewelry.objects.get(pk=jewelry_pk)
    remove_quantity_from_inventory(jewelry, 1)

    if customer_shopping_cart_pk:

        cart_item = ShoppingCart.objects.get(jewelry_id=jewelry_pk)
        quantity_as_int = cart_item.quantity

        if quantity_as_int:
            quantity_as_int += 1
            ShoppingCart.objects.filter(jewelry_id=jewelry_pk).update(quantity=quantity_as_int)

    else:
        ShoppingCart.objects.create(user=request.user, jewelry=jewelry, quantity=1)

    return redirect('view_shopping_cart')


class ShoppingCartView(View):
    MAX_QUANTITIES = {}
    template_name = 'shopping_cart/shopping_cart.html'

    def get_context_data(self):
        if self.request.user.is_authenticated:
            user_pk = self.request.user.pk

            jewelries_pks = ShoppingCart.objects.filter(user_id=user_pk).values_list('jewelry_id', flat=True)

            jewelries_by_quantities = {}

            for pk in jewelries_pks:
                jewelry = Jewelry.objects.get(pk=pk)
                quantity = ShoppingCart.objects.get(jewelry_id=pk).quantity
                min_quantity = 0
                max_quantity = quantity + jewelry.quantity
                self.MAX_QUANTITIES[jewelry] = max_quantity
                jewelries_by_quantities[jewelry] = {'quantity': quantity, 'min_quantity': min_quantity,
                                                    'max_quantity': max_quantity}

            total_price = ShoppingCart.objects.filter(user_id=user_pk).annotate(
                total=ExpressionWrapper(F('jewelry__price') * F('quantity'), output_field=DecimalField())
            ).aggregate(total_sum=Sum('total')).get('total_sum') or Decimal('0.00')

            context = {
                'user_pk': user_pk,
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
            jewelry = Jewelry.objects.get(pk=jewelry_id)
            old_quantity = ShoppingCart.objects.get(user_id=request.user.pk, jewelry_id=jewelry_id).quantity
            new_quantity = quantity_update_form.cleaned_data['quantity']

            if old_quantity < new_quantity:
                quantity = new_quantity - old_quantity
                jewelry = jewelry
                remove_quantity_from_inventory(jewelry, quantity)

            else:
                quantity = old_quantity - new_quantity
                jewelry = jewelry
                max_quantity = self.MAX_QUANTITIES[jewelry]
                add_quantity_to_inventory(jewelry, quantity, max_quantity)

            ShoppingCart.objects.filter(user_id=request.user.pk, jewelry_id=jewelry_id).update(
                quantity=new_quantity)

            if new_quantity == 0:
                ShoppingCart.objects.filter(user_id=request.user.pk, jewelry_id=jewelry_id).delete()

        context = self.get_context_data()

        return render(request, self.template_name, context)


class CompleteOrderView(UpdateView):
    template_name = 'shopping_cart/complete_order.html'
    model = AccountProfile
    fields = ('first_name', 'last_name', 'phone_number', 'delivery_address')

    def get_success_url(self):
        return reverse_lazy('complete_transaction', kwargs={'pk': self.request.user.pk})


class CompleteTransactionView(TemplateView):
    template_name = 'shopping_cart/proceed_transaction.html'

    def get_context_data(self, **kwargs):
        user_pk = self.request.user.pk

        context = super().get_context_data(**kwargs)
        context.update({
            'user_pk': user_pk,
            'required_card_number_field_length': 4,
            'required_expiry_date_length': 5,
            'required_cvv_length': 3,
        })

        return context

