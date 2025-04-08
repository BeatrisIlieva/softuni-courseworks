from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime

def index(request):
    context = {
        'current_time': datetime.now(),
        'person': {
            'age': 20
        }
        ,
        'ids': ['848474', '61432'],
        'some_text': 'hello, my name is Beatris and I am a developer.',
        'users': [
            'Steven',
            'Peter',
            'John',
            'Michel',
        ]
    }
    
    return render(request, 'base.html', context)


def dashboard(request):
    context = {
        'posts': [
            {
                'title': 'How to create a Django project 1',
                'author': 'Beatris',
                'content': 'I really do not know how to create a Django project',
                'created_at': datetime.now,
            },
                        
            {
                'title': 'How to create a Django project 2',
                'author': '',
                'content': 'I really do not know how to create a Django project',
                'created_at': datetime.now,
            },
                {
                'title': 'How to create a Django project 3',
                'author': 'Beatris',
                'content': '',
                'created_at': datetime.now,
            },
            
            ]
    }
    
    return render(request, 'posts/dashboard.html', context)