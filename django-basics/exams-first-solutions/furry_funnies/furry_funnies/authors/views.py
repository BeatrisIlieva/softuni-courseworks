from django.views import generic as views
from django.urls import reverse_lazy

from furry_funnies.authors.models import Author
from furry_funnies.authors.forms import (
    AuthorCreateForm,
    ProfileUpdateForm
)
from furry_funnies.core.utils import get_profile_object


class AuthorCreateView(views.CreateView):
    model = Author
    template_name = 'authors/create-author.html'
    form_class = AuthorCreateForm
    success_url = reverse_lazy('dashboard')


class AuthorDetailView(views.DetailView):
    template_name = 'authors/details-author.html'

    def get_object(self, queryset=None):
        return get_profile_object()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        posts_count = self.object.post_set.count()

        context['posts_count'] = posts_count

        last_updated_post = self.object.post_set.order_by(
            '-updated_at').first()

        context['last_updated_post'] = last_updated_post

        return context


class AuthorUpdateView(views.UpdateView):
    template_name = 'authors/edit-author.html'
    success_url = reverse_lazy('author-detail')
    form_class = ProfileUpdateForm

    def get_object(self, queryset=None):
        return get_profile_object()


class AuthorDeleteView(views.DeleteView):
    template_name = 'authors/delete-author.html'
    success_url = reverse_lazy('index')
    
    def get_object(self, queryset=None):
        return get_profile_object()
    
