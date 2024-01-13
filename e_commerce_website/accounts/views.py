from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect

from django.urls import reverse_lazy
from django.views import View

from django.views.generic import CreateView

from e_commerce_website.accounts.forms import RegisterUserForm

from e_commerce_website.common.mixins import NavigationBarMixin


class RegisterUserView(NavigationBarMixin, CreateView):
    template_name = 'accounts/register.html'
    form_class = RegisterUserForm

    success_url = reverse_lazy('index_page')

    def form_valid(self, form):
        result = super().form_valid(form)

        login(self.request, self.object)

        return result

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['next'] = self.request.GET.get('next', '')

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

    def get_success_url(self):
        next_url = self.request.POST.get('next', '')
        return next_url if next_url else self.success_url


class LoginUserView(NavigationBarMixin, LoginView):
    template_name = 'accounts/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context


class LogoutUserView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        logout(request)
        return redirect(reverse_lazy('login_user'))


