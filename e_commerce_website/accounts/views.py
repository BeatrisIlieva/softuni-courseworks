from django.contrib.auth import login, authenticate, get_user_model, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import CreateView, UpdateView, DeleteView, TemplateView, DetailView

from e_commerce_website.accounts.forms import RegisterUserForm
from e_commerce_website.accounts.models import AccountProfile

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

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['full_name'] = self.request.user.accountprofile.full_name
    #
    #     # context['is_owner'] = self.request.user == self.object
    #     # context['cats_count'] = self.object.cat_set.count()
    #     #
    #     # photos = self.object.photo_set.prefetch_related('photolike_set')
    #     #
    #     # context['photos_count'] = photos.count()
    #     # context['likes_count'] = sum(x.photolike_set.count() for x in photos)
    #
    #     return context

class UserUpdateView(UpdateView):
    template_name = 'account/update.html'
    model = AccountProfile
    fields = ('first_name', 'last_name', 'phone_number')

    def get_success_url(self):
        return reverse_lazy('details_user', kwargs={
            'pk': self.request.user.pk,
        })


class UserDeleteView(DeleteView):
    template_name = 'account/delete.html'
    model = UserModel
    success_url = reverse_lazy('index-page')




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
