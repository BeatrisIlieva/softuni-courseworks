from django.urls import reverse_lazy
from django.views import generic as views

from myMusicApp.profiles.models import Profile
from myMusicApp.profiles.forms import CreateProfileForm
from myMusicApp.core.utils import get_profile_object


class CreateProfileView(views.CreateView):
    model = Profile
    form_class = CreateProfileForm
    success_url = reverse_lazy('home-page')
    template_name = 'common/home-no-profile.html'


class DetailsProfileView(views.DetailView):
    # model = Profile
    template_name = 'profiles/profile-details.html'

    def get_object(self, queryset=None):
        profile = get_profile_object()
        
        return profile

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)

    #     albums_count = self.object.album_set.count()
    #     context['albums_count'] = albums_count

    #     return context


class DeleteProfileView(views.DeleteView):
    model = Profile
    template_name = 'profiles/profile-delete.html'
    success_url = reverse_lazy('home-page')

    def get_object(self, queryset=None):
        profile = get_profile_object()
        
        return profile

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)

    #     form = DeleteProfileForm
    #     context['form'] = form

    #     return context
