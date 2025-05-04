from django.urls import reverse_lazy
from django.views import generic as views
from django.views.generic.edit import BaseFormView

from myMusicApp.albums.models import Album
from myMusicApp.profiles.forms import CreateProfileForm
from myMusicApp.core.utils import get_profile_object


# DetailView and ListView are the only ones that do not have logic for a form
class HomePageView(views.ListView, BaseFormView):
    model = Album
    form_class = CreateProfileForm
    success_url = reverse_lazy('home-page')

    def get_template_names(self):
        profile = get_profile_object()

        if profile:
            return ['common/home-with-profile.html']

        return ['common/home-no-profile.html']
    
    def form_valid(self, form):
        form.save()
        
        return super().form_valid(form)
    
