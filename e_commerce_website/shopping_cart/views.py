from _decimal import Decimal

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import ExpressionWrapper, F, Sum, DecimalField
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse, reverse_lazy
from django.views import View
from django.views.generic import CreateView, ListView, FormView, TemplateView, DetailView, RedirectView

from e_commerce_website.common.mixins import NavigationBarMixin
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


class AddToShoppingCartView(RedirectView):

    def get_redirect_url(self, *args, **kwargs):
        quantity = 1
        pk = self.kwargs.get('pk')

        jewelry = Jewelry.objects.get(pk=pk)
        jewelry_pk = str(jewelry.pk)
        cart = self.request.session.get('cart', {})

        if jewelry_pk in cart:
            cart[jewelry_pk] += quantity
        else:
            cart[jewelry_pk] = quantity

        self.request.session['cart'] = cart
        remove_quantity_from_inventory(jewelry, quantity)

        ShoppingCart.objects.create(
            jewelry=jewelry,
            quantity=quantity,
            session_key=self.request.session.session_key,
        )

        return reverse('view_shopping_cart')




class MaxQuantityMixin:
    MAX_QUANTITIES = {}

class UpdateShoppingCartView(MaxQuantityMixin, FormView):
    form_class = QuantityUpdateForm
    template_name = 'shopping_cart/shopping_cart.html'

    def form_valid(self, form):
        jewelry_pk = form.cleaned_data['jewelry_id']
        jewelry = Jewelry.objects.get(pk=jewelry_pk)
        cart = self.request.session.get('cart', {})
        old_quantity = cart[str(jewelry_pk)]
        new_quantity = form.cleaned_data['quantity']

        if new_quantity == 0:

            if str(jewelry_pk) in cart.keys():
                del cart[str(jewelry_pk)]
            else:
                del cart[jewelry_pk]

            self.request.session['cart'] = cart

            if new_quantity == 0:
                ShoppingCart.objects.filter(session_key=self.request.session.session_key,jewelry_id=jewelry_pk).delete()

            return redirect('view_shopping_cart')

        elif old_quantity < new_quantity:
            quantity = new_quantity - old_quantity
            jewelry = jewelry
            remove_quantity_from_inventory(jewelry, quantity)

        else:
            quantity = old_quantity - new_quantity
            jewelry = jewelry
            max_quantity = self.MAX_QUANTITIES[jewelry]
            add_quantity_to_inventory(jewelry, quantity, max_quantity)

        cart[jewelry_pk]=new_quantity

        self.request.session['cart'] = cart

        ShoppingCart.objects.filter(session_key=self.request.session.session_key, jewelry_id=jewelry_pk).update(
            quantity=new_quantity)

        return redirect('view_shopping_cart')




class ShoppingCartView(MaxQuantityMixin, NavigationBarMixin, TemplateView):
    template_name = 'shopping_cart/shopping_cart.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        cart = self.request.session.get('cart', {})

        jewelries_by_quantities = {}
        total_price = 0

        for jewelry_pk, quantity in cart.items():
            quantity = int(quantity)

            jewelry = Jewelry.objects.get(pk=jewelry_pk)

            jewelry_total_price = jewelry.price * Decimal(quantity)
            total_price += jewelry_total_price

            min_quantity = 0

            max_quantity = quantity + jewelry.quantity

            self.MAX_QUANTITIES[jewelry] = max_quantity

            jewelries_by_quantities[jewelry] = {
                'quantity': quantity,
                'min_quantity': min_quantity,
                'max_quantity': max_quantity,
                'jewelry_total_price': jewelry_total_price
            }

        additional_context = {
            'total_price': total_price,
            'jewelries_by_quantities': jewelries_by_quantities,
        }

        context.update(additional_context)


        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context





# class AddToShoppingCartView(NavigationBarMixin, CreateView):
#     form_class = ShoppingCartForm
#     model = ShoppingCart
#     template_name = 'jewelry/jewelry_details.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         jewelry_pk = self.kwargs['jewelry_pk']
#         context['jewelry'] = get_object_or_404(Jewelry, pk=jewelry_pk)
#
#         nav_bar_context = self.get_nav_bar_context()
#         context.update(nav_bar_context)
#         return context
#
#     def form_valid(self, form, *args, **kwargs):
#         user = self.request.user
#         jewelry_pk = self.get_context_data()['jewelry'].pk
#
#         customer_shopping_cart = ShoppingCart.objects.filter(user_id=user, jewelry_id=jewelry_pk)
#
#         if customer_shopping_cart:
#             cart_item = customer_shopping_cart.get(jewelry_id=jewelry_pk)
#             quantity_as_int = cart_item.quantity
#
#             if quantity_as_int:
#                 quantity_as_int += 1
#                 ShoppingCart.objects.filter(jewelry_id=jewelry_pk).update(quantity=quantity_as_int)
#
#             return redirect('view_shopping_cart', user.pk)
#
#         cart = form.save(commit=False)
#         cart.user = self.request.user
#         quantity = 1
#
#         jewelry_pk = self.get_context_data()['jewelry'].pk
#         jewelry = get_object_or_404(Jewelry, pk=jewelry_pk)
#
#         cart.jewelry = jewelry
#         cart.quantity = quantity
#         cart.save()
#         return super().form_valid(form)
#
#     def get_success_url(self):
#         return reverse('view_shopping_cart', kwargs={
#             'pk': self.request.user.pk
#         })


# class ShoppingCartView(NavigationBarMixin,LoginRequiredMixin, View):
#     MAX_QUANTITIES = {}
#     template_name = 'shopping_cart/shopping_cart.html'
#
#     def get_context_data(self):
#         if self.request.user.is_authenticated:
#             user_pk = self.request.user.pk
#
#             jewelries_pks = ShoppingCart.objects.filter(user_id=user_pk).values_list('jewelry_id', flat=True)
#
#             jewelries_by_quantities = {}
#
#             for pk in jewelries_pks:
#                 jewelry = Jewelry.objects.get(pk=pk)
#                 quantity = ShoppingCart.objects.get(user_id=user_pk, jewelry_id=pk).quantity
#                 jewelry_total_price = jewelry.price * quantity
#                 min_quantity = 0
#                 max_quantity = quantity + jewelry.quantity
#                 self.MAX_QUANTITIES[jewelry] = max_quantity
#                 jewelries_by_quantities[jewelry] = {
#                     'quantity': quantity,
#                     'min_quantity': min_quantity,
#                     'max_quantity': max_quantity,
#                     'jewelry_total_price': jewelry_total_price
#                 }
#
#             total_price = ShoppingCart.objects.filter(user_id=user_pk).annotate(
#                 total=ExpressionWrapper(F('jewelry__price') * F('quantity'), output_field=DecimalField())
#             ).aggregate(total_sum=Sum('total')).get('total_sum') or Decimal('0.00')
#
#             context = {
#                 'user_pk': user_pk,
#                 'total_price': total_price,
#                 'jewelries_by_quantities': jewelries_by_quantities,
#                 'quantity_update_form': QuantityUpdateForm()
#             }
#
#             nav_bar_context = self.get_nav_bar_context()
#             context.update(nav_bar_context)
#
#             return context
#
#     def get(self, request, *args, **kwargs):
#         context = self.get_context_data()
#
#         return render(request, self.template_name, context)
#
#     def post(self, request, *args, **kwargs):
#
#         quantity_update_form = QuantityUpdateForm(request.POST)
#
#         if quantity_update_form.is_valid():
#
#             jewelry_id = quantity_update_form.cleaned_data['jewelry_id']
#             jewelry = Jewelry.objects.get(pk=jewelry_id)
#             old_quantity = ShoppingCart.objects.get(user_id=request.user.pk, jewelry_id=jewelry_id).quantity
#             new_quantity = quantity_update_form.cleaned_data['quantity']
#
#             if old_quantity < new_quantity:
#                 quantity = new_quantity - old_quantity
#                 jewelry = jewelry
#                 remove_quantity_from_inventory(jewelry, quantity)
#
#             else:
#                 quantity = old_quantity - new_quantity
#                 jewelry = jewelry
#                 max_quantity = self.MAX_QUANTITIES[jewelry]
#                 add_quantity_to_inventory(jewelry, quantity, max_quantity)
#
#             ShoppingCart.objects.filter(user_id=request.user.pk, jewelry_id=jewelry_id).update(
#                 quantity=new_quantity)
#
#             if new_quantity == 0:
#                 ShoppingCart.objects.filter(user_id=request.user.pk, jewelry_id=jewelry_id).delete()
#
#         context = self.get_context_data()
#
#         return render(request, self.template_name, context)
