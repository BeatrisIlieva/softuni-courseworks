from _decimal import Decimal

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import ExpressionWrapper, F, Sum, DecimalField
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import UpdateView, TemplateView
from django.views.generic.edit import FormMixin

from e_commerce_website.accounts.forms import AccountProfileForm

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.order.forms import CardDetailsForm
from e_commerce_website.order.utils import add_order, add_order_details
from e_commerce_website.profiles.models import AccountProfile

from e_commerce_website.shopping_cart.models import ShoppingCart


class CompleteOrderView(LoginRequiredMixin, NavigationBarMixin, UpdateView):
    template_name = 'order/complete_order.html'
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
    template_name = 'order/proceed_transaction.html'
    form_class = CardDetailsForm

    def get_context_data(self, **kwargs):
        user_pk = self.request.user.pk
        form = self.get_form()

        context = super().get_context_data(**kwargs)
        context.update({
            'user_pk': user_pk,
            'form': form,
            'required_card_number_length': 16,
            'required_expiry_date_length': 5,
            'required_cvv_length': 3,
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



class OrderDetails(LoginRequiredMixin,NavigationBarMixin, TemplateView):
    template_name = 'order/order_details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_pk = self.request.user.pk

        jewelries_pks = ShoppingCart.objects.\
            filter(session_key=self.request.session.session_key).\
            values_list('jewelry_id', flat=True)

        jewelries_by_quantities = {}

        for pk in jewelries_pks:
            jewelry = Jewelry.objects.get(pk=pk)
            quantity = ShoppingCart.objects.get(session_key=self.request.session.session_key, jewelry_id=pk).quantity
            jewelry_total_price = jewelry.price * quantity
            jewelries_by_quantities[jewelry] = {
                'quantity': quantity,
                'jewelry_total_price': jewelry_total_price
            }

        customer_full_name = AccountProfile.objects.get(pk=user_pk).full_name

        total_price = ShoppingCart.objects.filter(session_key=self.request.session.session_key).annotate(
            total=ExpressionWrapper(F('jewelry__price') * F('quantity'), output_field=DecimalField())
        ).aggregate(total_sum=Sum('total')).get('total_sum') or Decimal('0.00')

        country = AccountProfile.objects.get(pk=user_pk).country
        city = AccountProfile.objects.get(pk=user_pk).city
        delivery_address = AccountProfile.objects.get(pk=user_pk).delivery_address
        phone_number = AccountProfile.objects.get(pk=user_pk).phone_number

        add_order(user_pk)

        order_pk = add_order_details(user_pk, jewelries_by_quantities)

        self.request.session['cart'] = {}


        ShoppingCart.objects.filter(session_key=self.request.session.session_key).delete()

        context['user_pk'] = user_pk
        context['customer_full_name'] = customer_full_name
        context['jewelries_by_quantities'] = jewelries_by_quantities
        context['total_price'] = total_price
        context['country'] = country
        context['city'] = city
        context['delivery_address'] = delivery_address
        context['phone_number'] = phone_number
        context['order_pk'] = order_pk

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

