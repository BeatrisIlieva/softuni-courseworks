from _decimal import Decimal

from django.shortcuts import redirect
from django.urls import reverse

from django.views.generic import FormView, TemplateView, RedirectView

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.inventory.models import Inventory
from e_commerce_website.inventory.utils import remove_quantity_from_inventory, add_quantity_to_inventory
from e_commerce_website.jewelry.mixins import LastViewedJewelriesMixin
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.forms import QuantityUpdateForm
from e_commerce_website.shopping_cart.mixins import MaxQuantityMixin

from e_commerce_website.shopping_cart.models import ShoppingCart


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

        customer_shopping_cart = ShoppingCart.objects.filter(session_key=self.request.session.session_key,
                                                             jewelry_id=jewelry_pk)

        if customer_shopping_cart:
            cart_item = customer_shopping_cart.get(jewelry_id=jewelry_pk)
            quantity_as_int = cart_item.quantity

            if quantity_as_int:
                quantity_as_int += 1
                ShoppingCart.objects.filter(jewelry_id=jewelry_pk).update(quantity=quantity_as_int)

        else:

            ShoppingCart.objects.create(
                jewelry=jewelry,
                quantity=quantity,
                session_key=self.request.session.session_key,
            )

        return reverse('view_shopping_cart')

        # return reverse('display_jewelry_details', kwargs={
        #     'pk': pk
        # })


class UpdateShoppingCartView(MaxQuantityMixin, FormView):
    form_class = QuantityUpdateForm
    template_name = 'shopping_cart/shopping_cart.html'

    def form_valid(self, form):
        jewelry_pk = form.cleaned_data['jewelry_id']
        jewelry = Jewelry.objects.get(pk=jewelry_pk)
        cart = self.request.session.get('cart', {})
        old_quantity = cart[str(jewelry_pk)]
        new_quantity = form.cleaned_data['quantity']

        if old_quantity < new_quantity:
            quantity = new_quantity - old_quantity
            jewelry = jewelry
            remove_quantity_from_inventory(jewelry, quantity)

        else:
            quantity = old_quantity - new_quantity
            jewelry = jewelry
            max_quantity = self.MAX_QUANTITIES[jewelry]
            add_quantity_to_inventory(jewelry, quantity, max_quantity)

            if new_quantity == 0:

                if str(jewelry_pk) in cart.keys():
                    del cart[str(jewelry_pk)]
                else:
                    del cart[jewelry_pk]

                self.request.session['cart'] = cart

                if new_quantity == 0:
                    ShoppingCart.objects.filter(session_key=self.request.session.session_key,
                                                jewelry_id=jewelry_pk).delete()

                return redirect('view_shopping_cart')

        cart[jewelry_pk] = new_quantity

        self.request.session['cart'] = cart

        ShoppingCart.objects.filter(session_key=self.request.session.session_key, jewelry_id=jewelry_pk).update(
            quantity=new_quantity)

        return redirect('view_shopping_cart')


class ShoppingCartView(LastViewedJewelriesMixin, MaxQuantityMixin, NavigationBarMixin, TemplateView):
    template_name = 'shopping_cart/shopping_cart.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        cart = self.request.session.get('cart', {})

        jewelries_by_quantities = {}
        total_price = 0

        for jewelry_pk, quantity in cart.items():
            quantity = int(quantity)

            jewelry = Jewelry.objects.get(pk=jewelry_pk)
            price = Inventory.objects.get(jewelry_id=jewelry_pk).price

            jewelry_total_price = price * Decimal(quantity)
            total_price += jewelry_total_price

            inventory = Inventory.objects.get(jewelry=jewelry)

            min_quantity = 0

            max_quantity = quantity + inventory.quantity

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

        last_viewed_jewelries = self.get_last_viewed_jewelries(self.request.session)
        context.update(last_viewed_jewelries)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context
