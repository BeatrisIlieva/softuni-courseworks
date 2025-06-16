from django.views import generic as views
from django.urls import reverse_lazy

from tasty_recipes_app.profiles.models import Profile
from tasty_recipes_app.profiles.forms import ProfileCreateForm, ProfileUpdateForm
from tasty_recipes_app.core.utils import get_profile_object


class ProfileCreateView(views.CreateView):
    model = Profile
    form_class = ProfileCreateForm
    template_name = 'profiles/create-profile.html'
    success_url = reverse_lazy('recipe-list')


class ProfileDetailView(views.DetailView):
    template_name = 'profiles/details-profile.html'

    def get_object(self, queryset=None):
        return get_profile_object()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        profile = get_profile_object()
        recipes_count = profile.recipe_set.count()
        context['recipes_count'] = recipes_count

        return context


class ProfileUpdateView(views.UpdateView):
    model = Profile
    form_class = ProfileUpdateForm
    template_name = 'profiles/edit-profile.html'
    success_url = reverse_lazy('profile-detail')

    def get_object(self, queryset=None):
        return get_profile_object()


class ProfileDeleteView(views.DeleteView):
    template_name = 'profiles/delete-profile.html'
    success_url = reverse_lazy('index')
    
    def get_object(self, queryset=None):
        return get_profile_object()
