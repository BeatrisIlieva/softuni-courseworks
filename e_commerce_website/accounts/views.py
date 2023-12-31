from django.contrib.auth import login, get_user_model, logout
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView, TemplateView

from e_commerce_website.accounts.forms import RegisterUserForm, AccountProfileForm
from e_commerce_website.accounts.models import AccountProfile
from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.order.models import Order, OrderProducts

UserModel = get_user_model()


class RegisterUserView(CreateView):
    template_name = 'account/register.html'
    form_class = RegisterUserForm
    success_url = reverse_lazy('index-page')

    def form_valid(self, form):
        result = super().form_valid(form)

        login(self.request, self.object)

        return result


class LoginUserView(LoginView):
    template_name = 'account/login.html'


class LogoutUserView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect(reverse_lazy('login_user'))


class UserDetailsView(DetailView):
    template_name = 'account/details.html'
    model = UserModel


class UserUpdateView(UpdateView):
    template_name = 'account/update.html'
    model = AccountProfile
    form_class = AccountProfileForm

    def get_success_url(self):
        return reverse_lazy('details_user', kwargs={
            'pk': self.request.user.pk,
        })

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = self.get_form()
        return context


class UserOrdersView(TemplateView):
    template_name = 'account/orders.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_pk = self.request.user.pk

        order_details = {}

        orders = Order.objects.filter(user_id=user_pk)

        for order in orders:
            order_details[order.pk] = {
                'status': order.get_status_display(),
                'order_products': []
            }

            order_products = OrderProducts.objects.filter(order_id=order.pk)

            for order_product in order_products:
                jewelry = Jewelry.objects.get(pk=order_product.jewelry_id)
                quantity = order_product.quantity
                price = jewelry.price
                total_price_per_jewelry = price * quantity
                total_order_price = order_product.total_price

                order_details[order.pk]['order_products'].append({
                    'jewelry': jewelry,
                    'price': price,
                    'quantity': quantity,
                    'total_price': total_price_per_jewelry,
                    'total_order_price': total_order_price,
                })

        context['order_details'] = order_details

        return context


class UserDeleteView(DeleteView):
    template_name = 'account/delete.html'
    model = UserModel
    success_url = reverse_lazy('index-page')
