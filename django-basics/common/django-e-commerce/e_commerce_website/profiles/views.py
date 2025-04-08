from django.contrib.auth import get_user_model
from django.urls import reverse_lazy
from django.views.generic import UpdateView, DeleteView, DetailView
from e_commerce_website.profiles.forms import AccountProfileForm
from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.profiles.models import AccountProfile

UserModel = get_user_model()


# class UserDetailsView(NavigationBarMixin, DetailView):
#     template_name = 'profiles/update-profile.html'
#     model = UserModel
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#
#         nav_bar_context = self.get_nav_bar_context()
#         context.update(nav_bar_context)
#
#         return context


class UserUpdateView(NavigationBarMixin, UpdateView):
    template_name = 'profiles/update-profile.html'
    model = AccountProfile
    form_class = AccountProfileForm

    def get_success_url(self):
        return reverse_lazy('details_changed', kwargs={
            'pk': self.request.user.pk,
        })

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)
        context['form'] = self.get_form()
        return context


class UserDeleteView(DeleteView):
    template_name = 'profiles/delete-profile.html'
    model = UserModel
    success_url = reverse_lazy('profile-deleted')

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #
    #     nav_bar_context = self.get_nav_bar_context()
    #     context.update(nav_bar_context)
    #
    #     return context
