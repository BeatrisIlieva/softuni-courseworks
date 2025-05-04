from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views import View

from django.views import generic as views

from petstagram.common.forms import CommentForm
from petstagram.photos.forms import AddPhotoForm, PhotoEditForm
from petstagram.photos.models import Photo


class AddPhotoView(views.CreateView):
    model = Photo
    form_class = AddPhotoForm
    success_url = reverse_lazy('home-page')
    template_name = 'photos/photo-add-page.html'

def add_photo(request):
    if request.method == 'GET':
        form = AddPhotoForm()

    else:
        form = AddPhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

            return redirect('home-page')

    context = {
        'form': form
    }

    return render(request, 'photos/photo-add-page.html', context)


class DetailsPhotoView(views.DetailView):
    model = Photo
    template_name = 'photos/photo-details-page.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        likes = self.object.like_set.all()
        comments = self.object.comment_set.all()
        comment_form = CommentForm()
        
        context['likes'] = likes
        context['comments'] = comments
        context['comment_form'] = comment_form
        
        return context

def photo_details(request, pk: int):
    photo = Photo.objects.get(pk=pk)
    likes = photo.like_set.all()
    comments = photo.comment_set.all()
    comment_form = CommentForm()

    context = {
        'photo': photo,
        'likes': likes,
        'comments': comments,
        'comment_form': comment_form,
    }

    return render(request, 'photos/photo-details-page.html', context)

class EditPhotoView(views.UpdateView):
    model = Photo
    form_class = PhotoEditForm
    template_name = 'photos/photo-edit-page.html'
    
    def get_success_url(self):
        return reverse_lazy('photo-details', kwargs={'pk': self.kwargs['pk']})
    
def photo_edit(request, pk: int):
    photo = Photo.objects.get(pk=pk)

    if request.method == 'GET':
        form = PhotoEditForm(photo, initial=photo.__dict__)

    else:
        photo.delete()

    context = {
        'form': form,
    }

    return render(request, 'photos/photo-edit-page.html', context)


def photo_delete(request, pk: int):
    photo = Photo.objects.get(pk=pk)
    photo.delete()
    
    return redirect('home-page')
