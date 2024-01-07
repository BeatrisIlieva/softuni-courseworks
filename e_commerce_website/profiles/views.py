from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import UpdateView, DeleteView, DetailView, TemplateView
from e_commerce_website.accounts.forms import AccountProfileForm
from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.order.models import Order, OrderProducts
from e_commerce_website.profiles.models import AccountProfile

UserModel = get_user_model()
class LoginUserView(NavigationBarMixin, LoginView):
    template_name = 'account/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context


class LogoutUserView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect(reverse_lazy('login_user'))


class UserDetailsView(NavigationBarMixin, DetailView):
    template_name = 'account/details.html'
    model = UserModel

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context


class UserUpdateView(NavigationBarMixin, UpdateView):
    template_name = 'account/update.html'
    model = AccountProfile
    form_class = AccountProfileForm

    def get_success_url(self):
        return reverse_lazy('details_user', kwargs={
            'pk': self.request.user.pk,
        })

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)
        context['form'] = self.get_form()
        return context


class UserOrdersView(NavigationBarMixin, TemplateView):
    template_name = 'account/orders.html'

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
                'total_order_price': 0
            }

            order_products = OrderProducts.objects.filter(order_id=order.pk)

            for order_product in order_products:
                jewelry = Jewelry.objects.get(pk=order_product.jewelry_id)
                quantity = order_product.quantity
                price = jewelry.price
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


class UserDeleteView(NavigationBarMixin, DeleteView):
    template_name = 'account/delete.html'
    model = UserModel
    success_url = reverse_lazy('index_page')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context




