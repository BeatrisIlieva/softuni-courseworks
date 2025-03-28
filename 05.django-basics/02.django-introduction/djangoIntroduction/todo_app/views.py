from django.http import HttpResponse
from django.shortcuts import render

from djangoIntroduction.todo_app.models import Task


def index(request):

    title_filter = request.GET.get('title_filter', "")

    if title_filter:
        tasks = Task.objects.filter(name__icontains=title_filter)
    else:
        tasks = Task.objects.all()

    context = {
        "title_filter": title_filter,
        "tasks": tasks,
    }

    return render(request, 'tasks/index.html', context)




def add_view(request):
    return HttpResponse(
        '<h1>Add task</h1>'
    )  # By default HttpResponse returns MIME type text/html
