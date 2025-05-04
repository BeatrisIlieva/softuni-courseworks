from django.shortcuts import redirect, render, resolve_url
from pyperclip import copy

from petstagram.common.forms import CommentForm, SearchForm
from petstagram.common.models import Like
from petstagram.photos.models import Photo

from django.views import generic as views


class HomePageView(views.ListView):
    model = Photo
    template_name = 'common/home-page.html'
    context_object_name = 'all_photos'
    paginate_by = 2
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        comment_form = CommentForm()
        search_form = SearchForm(self.request.GET)
        
        context['search_form'] = search_form
        context['comment_form'] = comment_form
        
        return context


def home_page(request):
    all_photos = Photo.objects.all()
    comment_form = CommentForm()
    search_form = SearchForm(request.GET)

    if search_form.is_valid():
        pet_name = search_form.cleaned_data['pet_name']

        all_photos = all_photos.filter(tagged_pets__name__icontains=pet_name)

    context = {
        'all_photos': all_photos,
        'comment_form': comment_form,
        'search_form': search_form,
    }

    return render(request, 'common/home-page.html', context)


def like_functionality(request, pk: int):
    photo = Photo.objects.get(pk=pk)

    liked_obj = Like.objects.filter(to_photo=photo).first()

    if liked_obj:
        liked_obj.delete()
    else:
        Like.objects.create(to_photo=photo)

    return redirect(request.META['HTTP_REFERER'] + f'#{pk}')


def share_functionality(request, pk: int):
    copy(request.META['HTTP_HOST'] + resolve_url('photo-details', pk))

    return redirect(request.META['HTTP_REFERER'] + f'#{pk}')


def comment_functionality(request, pk: int):

    if request.method == 'POST':
        photo = Photo.objects.get(pk=pk)
        form = CommentForm(request.POST)

        if form.is_valid():
            comment = form.save(commit=False)
            comment.to_photo = photo

            comment.save()

            return redirect(request.META['HTTP_REFERER'] + f'#{pk}')


def search_functionality(request):
    pass
