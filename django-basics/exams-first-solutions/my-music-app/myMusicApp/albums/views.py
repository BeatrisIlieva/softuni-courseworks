from django.urls import reverse_lazy
from django.views import generic as views

from myMusicApp.albums.models import Album
from myMusicApp.profiles.models import Profile
from myMusicApp.albums.forms import CreateAlbumForm, DeleteAlbumForm, EditAlbumForm

from myMusicApp.core.utils import get_profile_object


class CreateAlbumView(views.CreateView):
    model = Album
    form_class = CreateAlbumForm
    template_name = 'albums/album-add.html'
    success_url = reverse_lazy('home-page')

    def form_valid(self, form):
        profile = get_profile_object()
        form.instance.owner = profile

        return super().form_valid(form)


class DetailsAlbumView(views.DetailView):
    model = Album
    template_name = 'albums/album-details.html'
    pk_url_kwarg = 'id'


class EditAlbumView(views.UpdateView):
    model = Album
    form_class = EditAlbumForm
    template_name = 'albums/album-edit.html'
    pk_url_kwarg = 'id'
    success_url = reverse_lazy('home-page')


class DeleteAlbumView(views.DeleteView):
    model = Album
    form_class = DeleteAlbumForm
    template_name = 'albums/album-delete.html'
    pk_url_kwarg = 'id'
    success_url = reverse_lazy('home-page')
    
    def get_initial(self):
        return self.object.__dict__
    
    def form_invalid(self, form):
        return self.form_valid(form)
    
    # def get_context_data(self, **kwargs):
    #     context =  super().get_context_data(**kwargs)
        
    #     form = DeleteAlbumForm(initial=self.object.__dict__)
        
    #     context['form'] = form
        
    #     return context
