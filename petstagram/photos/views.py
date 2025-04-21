from django.shortcuts import redirect, render

from petstagram.common.forms import CommentForm
from petstagram.photos.forms import AddPhotoForm, PhotoEditForm
from petstagram.photos.models import Photo


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
