from datetime import datetime
from django.forms import modelform_factory
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView, RedirectView, ListView, FormView, CreateView, UpdateView, DeleteView

from forumApp.posts.forms import CommentFormSet, PersonForm, PostCreateForm, PostDeleteForm, PostEditForm, SearchForm
from forumApp.posts.models import Comment, Post


class IndexView(TemplateView):
    # template_name = 'common/index.html'
    extra_context = {
        'static_time': datetime.now(),
    }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['dynamic_time'] = datetime.now()

        return context

    def get_template_names(self):
        if self.request.user.is_authenticated:
            return ['index_logged_in.html']

        else:
            return ['index.html']


class RedirectHomeView(RedirectView):
    url = reverse_lazy('index')

    def get_redirect_url(self, *args, **kwargs):
        return super().get_redirect_url(*args, **kwargs)


class Index(View):
    def get(self, request, *args, **kwargs):

        context = {
            'current_time': datetime.now()
        }

        return render(request, 'index.html', context)


def index(request):

    form = PersonForm(request.POST or None)

    context = {
        'form': form,
    }

    # context = {
    #     'current_time': datetime.now(),
    #     'person': {
    #         'name': 'John'
    #     },
    #     'ids': ['123', '3455', '555'],
    #     'some_text': 'hello my name is Beatris and I am a developer.'
    # }

    return render(request, 'base.html', context)


class DashBoardView(ListView, FormView):
    template_name = 'posts/dashboard.html'
    model = Post
    form_class = SearchForm
    success_url = reverse_lazy('dashboard')

    def get_queryset(self):
        queryset = self.model.objects.all()
        
        if 'query' in self.request.GET:

            query = self.request.GET.get('query')

            queryset = self.queryset.filter(title__icontains=query)

        return queryset


def dashboard(request):
    form = SearchForm()
    posts = Post.objects.all()

    if request.method == 'GET':
        form = SearchForm(request.GET)

        if form.is_valid():
            query = form.cleaned_data['query']
            posts = posts.filter(title__icontains=query)

    context = {
        'posts': posts,
        'form': form,
    }

    return render(request, 'posts/dashboard.html', context)


class PostCreateForm(CreateView):
    model = Post
    form_class = PostCreateForm
    template_name = 'posts/add-post.html'
    success_url = reverse_lazy('dashboard')


def add_post(request):
    form = PostCreateForm(request.POST or None, request.FILES or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save()

            return redirect('dashboard')

    context = {
        'form': form
    }

    return render(request, 'posts/add-post.html', context)

class DeletePostView(DeleteView, FormView):
    model = Post
    form_class = PostDeleteForm
    template_name = 'posts/delete-post.html'
    context_obj_name = 'post'
    success_url = reverse_lazy('dashboard')
    
    def get_initial(self):
        pk = self.kwargs.get(self.pk_url_kwarg)
        post = Post.objects.get(pk=pk)
        return post.__dict__
    
def delete_post(request, pk: int):
    post = Post.objects.get(pk=pk)
    form = PostDeleteForm(instance=post)

    if request.method == 'POST':
        post.delete()

        return redirect('dashboard')

    context = {
        'form': form,
        'post': post,
    }

    return render(request, 'posts/delete-post.html', context)


def details_post(request, pk: int):
    post = Post.objects.get(pk=pk)

    formset = CommentFormSet(request.POST or None)

    if request.method == 'POST':
        if formset.is_valid():
            for form in formset:
                if form.cleaned_data:
                    comment = form.save(commit=False)
                    comment.post = post
                    comment.save()

            return redirect('details-post', pk=post.id)

    comments = Comment.objects.all()

    context = {
        'post': post,
        'formset': formset,
        'comments': comments
    }

    return render(request, 'posts/details-post.html', context)


class UpdatePostView(UpdateView):
    model = Post
    # form_class = PostEditForm
    template_name = 'posts/edit-post.html'
    success_url = reverse_lazy('dashboard')
    
    def get_form_class(self):
        if self.request.user.is_superuser:
            return modelform_factory(Post, fields=('title', 'content', 'author', 'languages'))
        else:
            return modelform_factory(Post, fields=( 'content',))
    

def edit_post(request, pk: int):
    post = Post.objects.get(pk=pk)

    if request.method == 'POST':
        form = PostEditForm(request.POST, instance=post)

        if form.is_valid():
            form.save()

            return redirect('dashboard')

    else:
        form = PostEditForm(instance=post)

    context = {
        'form': form,
        'post': post,
    }

    return render(request, 'posts/edit-post.html', context)
