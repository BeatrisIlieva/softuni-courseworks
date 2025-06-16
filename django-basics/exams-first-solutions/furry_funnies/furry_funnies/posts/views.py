from django.views import generic as views
from django.urls import reverse_lazy

from furry_funnies.posts.models import Post
from furry_funnies.posts.forms import (
    PostCreateForm,
    PostUpdateForm,
    PostDeleteForm,
)
from furry_funnies.core.utils import get_profile_object


class PostCreateView(views.CreateView):
    model = Post
    template_name = 'posts/create-post.html'
    form_class = PostCreateForm
    success_url = reverse_lazy('dashboard')
    pk_url_kwarg = 'post_id'

    def form_valid(self, form):
        profile = get_profile_object()
        post = form.instance

        post.author = profile

        return super().form_valid(form)


class PostDetailView(views.DetailView):
    model = Post
    template_name = 'posts/details-post.html'
    pk_url_kwarg = 'post_id'


class PostUpdateView(views.UpdateView):
    model = Post
    template_name = 'posts/edit-post.html'
    pk_url_kwarg = 'post_id'
    form_class = PostUpdateForm
    success_url = reverse_lazy('dashboard')


class PostDeleteView(views.DeleteView, views.FormView):
    model = Post
    template_name = 'posts/delete-post.html'
    pk_url_kwarg = 'post_id'
    success_url = reverse_lazy('dashboard')
    form_class = PostDeleteForm

    def get_initial(self):
        return self.object.__dict__

    def form_invalid(self, form):
        return self.form_valid(form)
