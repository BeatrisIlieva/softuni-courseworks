from django.shortcuts import redirect

from e_commerce_website.jewelry.models import Jewelry


def view_jewelry(request, pk):
    jewelry = Jewelry.objects.get(pk=pk)
    last_viewed_jewelries = request.session.get('last_viewed_jewelries', [])

    if jewelry.pk in last_viewed_jewelries:
        last_viewed_jewelries.remove(jewelry.pk)

    last_viewed_jewelries.append(jewelry.pk)

    start_index = max(
        0,
        len(last_viewed_jewelries) - 3,
    )

    request.session['last_viewed_jewelries'] = last_viewed_jewelries[start_index:]

    return redirect('display_jewelry_details', pk=pk)
