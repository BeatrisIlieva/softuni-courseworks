from django.contrib.auth import login, authenticate, get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.forms import modelform_factory
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import CreateView, UpdateView, DeleteView, TemplateView

from e_commerce_website.accounts.forms import RegisterUserForm
from e_commerce_website.accounts.models import Account

class AccountOptionsView(TemplateView):
    template_name = 'account/account.html'
class RegisterUserView(CreateView):
    template_name = 'account/register.html'
    form_class = RegisterUserForm
    success_url = reverse_lazy('register_user')

    def form_valid(self, form):
        result  = super().form_valid(form)

        login(self.request, self.object)

        return result



class LoginUserView(LoginView):
    template_name = 'account/login.html'
    extra_context = {'title': 'login', 'link_title': 'register'}


class LogoutUserView(LogoutView):
    pass

UserModel = get_user_model()

# class AccountLoginView(TemplateView):
#     model = Account
#     template_name =
#
# class DisabledFormFieldsMixin:
#     disabled_fields = ()
#     def get_form(self, *args, **kwargs):
#         form = super().get_form(*args, **kwargs)
#         for field in self.disabled_fields:
#             form.fields[field].widget.attrs['disable'] = 'disabled'
#             form.fields[field].widget.attrs['readonly'] = 'readonly'
#
# class AccountCreateView(CreateView):
#     model = Account
#     template_name =
#
#     # fields = ('username', 'password',)
#     form_class = ProfileForm
#     success_url = reverse_lazy('index-page')
#
# class AccountUpdateView(DisabledFormFieldsMixin, UpdateView):
#     model = Account
#     template_name =
#
#     disabled_fields = ('username',)
#
# class AccountDeleteView(DisabledFormFieldsMixin, DeleteView):
#     model = Account
#     template_name =
#     form_class = modelform_factory(
#         model=Account,
#         fields=('username', 'password'),
#         widgets={}
#     )
#
#     disabled_fields = ('username', 'password')
#
#
