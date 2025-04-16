from datetime import datetime
from django.http import HttpResponse
from django.shortcuts import render, redirect

from forumApp.posts.forms import PersonForm, PostCreateForm, PostDeleteForm, SearchForm
from forumApp.posts.models import Post


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


def add_post(request):
    form = PostCreateForm(request.POST or None)
    
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            
            return redirect('dashboard')
        
    context = {
        'form': form
    }
    
    return render(request, 'posts/add-post.html', context)


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

def details_post(request, pk:int):
    post = Post.objects.get(pk=pk)

    context = {
        'post': post,
    }
    
    return render(request, 'posts/details-post.html', context)
    
    
    