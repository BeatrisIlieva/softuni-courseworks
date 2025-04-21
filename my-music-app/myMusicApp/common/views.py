from django.shortcuts import render
from django.views import generic as views

from myMusicApp.albums.models import Album
from myMusicApp.profiles.forms import CreateProfileForm
from myMusicApp.common.utils import is_user_authenticated


class HomePageView(views.ListView):
    model = Album

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        form = CreateProfileForm()

        context['form'] = form

        return context

    def get_template_names(self):
        if is_user_authenticated():
            return ['common/home-with-profile.html']

        return ['common/home-no-profile.html']


