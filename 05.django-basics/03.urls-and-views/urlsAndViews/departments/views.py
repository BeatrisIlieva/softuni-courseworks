import json
from django.shortcuts import get_object_or_404, redirect, render
from django.http import Http404, HttpResponse, JsonResponse
from django.urls import reverse, reverse_lazy

from urlsAndViews.departments.models import Department


def index(request):
    url = reverse('redirect-view')
    url_lazy = reverse_lazy('redirect-view')

    return HttpResponse(f"{url_lazy}")


# def view_with_name(request, *args, **kwargs):
#     return HttpResponse(f"<h1>Args: {args} Kwargs: {kwargs}</h1>")


def view_with_name(request, param):
    # return HttpResponse(f"<h1>Param: {param}</h1>")
    context = {'variable': param}
    return render(request, "departments/name_template.html", context, status=405)


def view_with_pk(request, pk: int):
    # return HttpResponse(json.dumps({'pk': pk}), content_type='application/json')
    return JsonResponse({"pk": pk})


def view_with_slug(request, pk, slug):
    # department = Department.objects.filter(pk=pk, slug=slug)

    # if not department:
    #     raise Http404

    # department = get_object_or_404(Department, pk=pk, slug=slug)

    raise Http404

    # return HttpResponse(f"<h1>Department from slug: {department}</h1>")


def show_archive(request, archive_year):
    return HttpResponse(f"<h1>The year is {archive_year}</h1>")


# absolute redirect
def redirect_to_softuni(request):
    return redirect('https://softuni.bg')


# relative redirect
def redirect_to_view(request):
    return redirect('numbers', pk=2)
