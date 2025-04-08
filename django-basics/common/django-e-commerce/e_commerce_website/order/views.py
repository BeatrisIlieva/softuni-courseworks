from _decimal import Decimal

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import ExpressionWrapper, F, Sum, DecimalField
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import UpdateView, TemplateView
from django.views.generic.edit import FormMixin

from e_commerce_website.profiles.forms import AccountProfileForm

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.order.forms import CardDetailsForm
from e_commerce_website.order.models import Order, OrderProducts
from e_commerce_website.order.utils import add_order, add_order_details
from e_commerce_website.profiles.models import AccountProfile

from e_commerce_website.shopping_cart.models import ShoppingCart


class CompleteOrderView(LoginRequiredMixin, NavigationBarMixin, UpdateView):
    template_name = 'order/complete-order.html'
    model = AccountProfile
    form_class = AccountProfileForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

    def get_success_url(self):
        return reverse_lazy('complete_transaction', kwargs={'pk': self.request.user.pk})


class CompleteTransactionView(LoginRequiredMixin,NavigationBarMixin, TemplateView, FormMixin):
    template_name = 'order/proceed-transaction.html'
    form_class = CardDetailsForm

    def get_context_data(self, **kwargs):
        user_pk = self.request.user.pk
        form = self.get_form()

        context = super().get_context_data(**kwargs)
        context.update({
            'user_pk': user_pk,
            'form': form,
        })

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        user_pk = self.request.user.pk
        if form.is_valid():

            return redirect('order_details', pk=user_pk)

        else:
            context = self.get_context_data()

            return self.render_to_response(context)



class OrderDetailsView(LoginRequiredMixin,NavigationBarMixin, TemplateView):
    template_name = 'order/order-details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_pk = self.request.user.pk

        jewelries_pks = ShoppingCart.objects.\
            filter(session_key=self.request.session.session_key).\
            values_list('jewelry_id', flat=True)

        jewelries_by_quantity_and_size = {}

        total_price = 0

        for pk in jewelries_pks:
            jewelry = Jewelry.objects.get(pk=pk)
            price = Inventory.objects.get(jewelry_id=pk).price
            quantity = ShoppingCart.objects.get(session_key=self.request.session.session_key, jewelry_id=pk).quantity
            size = ShoppingCart.objects.get(session_key=self.request.session.session_key, jewelry_id=pk).size
            jewelry_total_price = price * quantity
            jewelries_by_quantity_and_size[jewelry] = {
                'quantity': quantity,
                'size': size,
                'jewelry_total_price': jewelry_total_price
            }

            total_price += jewelry_total_price

        customer_full_name = AccountProfile.objects.get(pk=user_pk).full_name

        # total_price = ShoppingCart.objects.filter(session_key=self.request.session.session_key).annotate(
        #     total=ExpressionWrapper(F('jewelry__price') * F('quantity'), output_field=DecimalField())
        # ).aggregate(total_sum=Sum('total')).get('total_sum') or Decimal('0.00')

        country = AccountProfile.objects.get(pk=user_pk).country
        city = AccountProfile.objects.get(pk=user_pk).city
        delivery_address = AccountProfile.objects.get(pk=user_pk).delivery_address
        phone_number = AccountProfile.objects.get(pk=user_pk).phone_number

        add_order(user_pk)

        order_pk = add_order_details(user_pk, jewelries_by_quantity_and_size)

        self.request.session['cart'] = {}


        ShoppingCart.objects.filter(session_key=self.request.session.session_key).delete()

        context['user_pk'] = user_pk
        context['customer_full_name'] = customer_full_name
        context['jewelries_by_quantity_and_size'] = jewelries_by_quantity_and_size
        context['total_price'] = total_price
        context['country'] = country
        context['city'] = city
        context['delivery_address'] = delivery_address
        context['phone_number'] = phone_number
        context['order_pk'] = order_pk

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context


class UserOrdersView(NavigationBarMixin, TemplateView):
    template_name = 'order/orders-history.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_pk = self.request.user.pk

        order_details = {}

        orders = Order.objects.filter(user_id=user_pk)

        for order in orders:
            total_order_price = 0

            order_details[order.pk] = {
                'status': order.get_status_display(),
                'order_products': [],
                'total_order_price': total_order_price
            }

            order_products = OrderProducts.objects. \
                filter(order_id=order.pk)

            for order_product in order_products:
                jewelry = Jewelry.objects.get(pk=order_product.jewelry_id)
                quantity = order_product.quantity
                price = Inventory.objects.get(jewelry=jewelry).price
                total_price_per_jewelry = price * quantity

                order_details[order.pk]['order_products'].append({
                    'jewelry': jewelry,
                    'price': price,
                    'quantity': quantity,
                    'total_price': total_price_per_jewelry,

                })

                total_order_price += total_price_per_jewelry

            order_details[order.pk]['total_order_price'] = total_order_price

        context['order_details'] = order_details

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

