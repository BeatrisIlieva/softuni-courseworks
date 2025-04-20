from django.shortcuts import redirect, render

from petstagram.common.models import Like
from petstagram.photos.models import Photo


def home_page(request):
    all_photos = Photo.objects.all()

    context = {
        'all_photos': all_photos,
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
