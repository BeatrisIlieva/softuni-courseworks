from datetime import datetime
from django.http import HttpResponse
from django.shortcuts import render


def index(request):

    context = {
        'current_time': datetime.now(),
        'person': {
            'name': 'John'
        },
        'ids': ['123', '3455', '555'],
        'some_text': 'hello my name is Beatris and I am a developer.'
    }

    return render(request, 'base.html', context)


def dashboard(request):
    context = {
        'posts': [
            {
                'title': 'How ti cerate django project 1',
                'author': 'Beatris',
                'content': 'Some content 1',
                'created_at': datetime.now(),
            },
            {
                'title': 'How ti cerate django project 2',
                'author': 'Beatris',
                'content': 'Some content 2',
                'created_at': datetime.now(),
            },
            {
                'title': 'How ti cerate django project 3',
                'author': 'Beatris',
                'content': 'Some content 3',
                'created_at': datetime.now(),
            }
        ]
    }

    return render(request, 'posts/dashboard.html', context)
