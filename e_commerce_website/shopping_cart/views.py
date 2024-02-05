from _decimal import Decimal

from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse

from django.views.generic import FormView, TemplateView, RedirectView

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.inventory.models import Inventory
from e_commerce_website.inventory.utils import remove_quantity_from_inventory, add_quantity_to_inventory
from e_commerce_website.jewelry.mixins import LastViewedJewelriesMixin, JewelryStonesMixin, JewelryMetalsMixin
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.shopping_cart.forms import QuantityUpdateForm
from e_commerce_website.shopping_cart.mixins import MaxQuantityMixin

from e_commerce_website.shopping_cart.models import ShoppingCart


class AddToShoppingCartView(RedirectView):
    QUANTITY_TO_DECREASE_UPON_ADDING_TO_SHOPPING_CART = 1
    QUANTITY_TO_INCREASE_UPON_ADDING_TO_NEW_CART = 1
    QUANTITY_TO_INCREASE_IF_EXISTING_SHOPPING_CART = 1

    # def get_redirect_url(self, *args, **kwargs):
    def get(self, request, *args, **kwargs):
        quantity = self.QUANTITY_TO_DECREASE_UPON_ADDING_TO_SHOPPING_CART
        pk = self.kwargs.get('pk')

        jewelry = Jewelry.objects.get(pk=pk)
        jewelry_pk = str(jewelry.pk)
        cart = self.request.session.get('cart', {})

        jewelry_by_size = request.session.get('jewelry_by_size', {})
        size = jewelry_by_size[jewelry_pk]

        if jewelry_pk in cart:
            cart[jewelry_pk]['quantity'] += quantity
        else:
            cart[jewelry_pk] = {'quantity': self.QUANTITY_TO_INCREASE_UPON_ADDING_TO_NEW_CART, 'size': size}

        request.session['cart'] = cart

        remove_quantity_from_inventory(jewelry, quantity)

        customer_shopping_cart = ShoppingCart.objects.filter(session_key=self.request.session.session_key,
                                                             jewelry_id=jewelry_pk)

        if customer_shopping_cart:
            cart_item = customer_shopping_cart.get(jewelry_id=jewelry_pk)
            quantity_as_int = cart_item.quantity

            if quantity_as_int:
                quantity_as_int += self.QUANTITY_TO_INCREASE_IF_EXISTING_SHOPPING_CART
                ShoppingCart.objects.filter(jewelry_id=jewelry_pk).update(quantity=quantity_as_int)

        else:

            ShoppingCart.objects.create(
                jewelry=jewelry,
                quantity=quantity,
                session_key=self.request.session.session_key,
                size=size,
            )
        # return redirect(request.META.get('HTTP_REFERER', 'fallback_url'))
        return HttpResponseRedirect(reverse('view_shopping_cart'))

        # return reverse('view_shopping_cart')

        # return reverse('display_jewelry_details', kwargs={
        #     'pk': pk
        # })


class UpdateShoppingCartView(MaxQuantityMixin, FormView):
    form_class = QuantityUpdateForm
    template_name = 'shopping-cart/shopping-cart.html'

    ZERO_QUANTITY = 0

    def form_valid(self, form):
        jewelry_pk = form.cleaned_data['jewelry_id']
        jewelry = Jewelry.objects.get(pk=jewelry_pk)
        cart = self.request.session.get('cart', {})
        old_quantity = cart[str(jewelry_pk)]['quantity']
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

            if new_quantity == self.ZERO_QUANTITY:

                if str(jewelry_pk) in cart.keys():
                    del cart[str(jewelry_pk)]
                else:
                    del cart[jewelry_pk]

                self.request.session['cart'] = cart

                if new_quantity == self.ZERO_QUANTITY:
                    ShoppingCart.objects.filter(session_key=self.request.session.session_key,
                                                jewelry_id=jewelry_pk).delete()

                return redirect('view_shopping_cart')

        cart[str(jewelry_pk)]['quantity'] = new_quantity

        self.request.session['cart'] = cart

        ShoppingCart.objects.filter(session_key=self.request.session.session_key, jewelry_id=jewelry_pk).update(
            quantity=new_quantity)

        return redirect('view_shopping_cart')


class DisplayShoppingCartView(LastViewedJewelriesMixin, JewelryStonesMixin, JewelryMetalsMixin, MaxQuantityMixin, NavigationBarMixin, TemplateView):
    template_name = 'shopping-cart/shopping-cart.html'

    MIN_QUANTITY = 0
    INITIAL_TOTAL_PRICE = 0

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        cart = self.request.session.get('cart', {})

        jewelries_by_quantity_and_size = {}
        total_price = self.INITIAL_TOTAL_PRICE

        for jewelry_pk, quantity_size in cart.items():
            size = quantity_size['size']
            quantity = int(quantity_size['quantity'])

            jewelry = Jewelry.objects.get(pk=jewelry_pk)
            price = Inventory.objects.get(jewelry_id=jewelry_pk).price

            jewelry_total_price = price * Decimal(quantity)
            total_price += jewelry_total_price

            inventory = Inventory.objects.get(jewelry=jewelry)

            min_quantity = self.MIN_QUANTITY

            max_quantity = quantity + inventory.quantity

            self.MAX_QUANTITIES[jewelry] = max_quantity

            jewelries_by_quantity_and_size[jewelry] = {
                'size':size,
                'quantity': quantity,
                'min_quantity': min_quantity,
                'max_quantity': max_quantity,
                'jewelry_total_price': jewelry_total_price,
                'stone_info_dict': self.get_jewelry_stones(jewelry),
                'metal_info_dict': self.get_jewelry_metals(jewelry)
            }

        additional_context = {
            'total_price': total_price,
            'jewelries_by_quantity_and_size': jewelries_by_quantity_and_size,
        }

        context.update(additional_context)
        request_session = self.request.session
        last_viewed_jewelries = self.get_last_viewed_jewelries(request_session)
        context.update(last_viewed_jewelries)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context
