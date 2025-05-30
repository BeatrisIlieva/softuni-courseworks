from django.shortcuts import redirect, render, resolve_url
from pyperclip import copy

from django.views import generic as views

from petstagram.common.forms import CommentForm, SearchForm
from petstagram.common.models import Like
from petstagram.photos.models import Photo

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class HomePage(views.ListView):
    model = Photo
    template_name = 'common/home-page.html'
    context_object_name = 'all_photos'
    paginate_by = 1

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['comment_form'] = CommentForm()
        context['search_form'] = SearchForm(self.request.GET)
        
        return context
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        pet_name = self.request.GET.get('pet_name')
        
        if pet_name:
            queryset = queryset.filter(
                tagged_pets__name__icontains=pet_name
            )
            
        return queryset


def home_page(request):
    all_photos = Photo.objects.all()
    comment_form = CommentForm()
    search_form = SearchForm(request.GET)

    if search_form.is_valid():
        all_photos = all_photos.filter(
            tagged_pets__name__icontains=search_form.cleaned_data['pet_name']
        )

    photos_per_page = 1
    paginator = Paginator(all_photos, photos_per_page)
    page_number = request.GET.get('page')

    try:
        all_photos = paginator.page(page_number)
    except PageNotAnInteger:
        all_photos = paginator.page(1)
    except EmptyPage:
        all_photos = paginator.page(paginator.num_pages)

    context = {
        'all_photos': all_photos,
        'comment_form': comment_form,
        'search_form': search_form,
    }

    return render(request, 'common/home-page.html', context)


def likes_functionality(request, photo_id: int):
    liked_object = Like.objects.filter(
        to_photo_id=photo_id
    ).first()

    if liked_object:
        liked_object.delete()

    else:
        like = Like(to_photo_id=photo_id)
        like.save()

    return redirect(request.META.get('HTTP_REFERER') + f'#{photo_id}')


def share_functionality(request, photo_id: int):
    copy(request.META.get('HTTP_HOST') + resolve_url('photo-details', photo_id))

    return redirect(request.META.get('HTTP_REFERER') + f'#{photo_id}')


def comment_functionality(request, photo_id: int):
    if request.method == 'POST':
        photo = Photo.objects.get(pk=photo_id)

        comment_form = CommentForm(request.POST)

        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.to_photo = photo

            comment.save()

        return redirect(request.META.get('HTTP_REFERER') + f'#{photo_id}')
