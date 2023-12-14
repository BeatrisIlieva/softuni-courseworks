from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from e_commerce_website.jewelry.forms import JewelryForm
from .models import JewelryDetails

from django.db.models import Q

def show_jewelries(request, customer_gender_pk, category_pk):
    
    selection_form = JewelryForm(request.GET)
    selection_pattern = None
    print(selection_pattern)
    if selection_form.is_valid():
        selection_pattern = selection_form.cleaned_data['style']
        print(selection_pattern)

    jewelries = JewelryDetails.objects.all()
    if selection_pattern:
        jewelries = jewelries.filter(jewelry_style=selection_pattern)
    
    if request.method == 'get':
        form = JewelryForm()
        
    else:
        form = JewelryForm(request.POST)
    
    jewelries = JewelryDetails.objects.filter(Q(jewelry__customer_gender=customer_gender_pk), Q(jewelry__category=category_pk))
    
    context = {
        'jewelries': jewelries,
        'form': form,
    }
    
    nav_bar_context = get_nav_bar_context()
    
    context.update(nav_bar_context)
    
    return render(request, 'jewelry/jewelries.html', context)


def show_jewelry_details(request, jewelry_pk):
    
    jewelry = JewelryDetails.objects.filter(pk=jewelry_pk).get()
    
    context = {
        'jewelry': jewelry,
    }
    
    nav_bar_context = get_nav_bar_context()
    
    context.update(nav_bar_context)
    
    return render(request, 'jewelry/jewelry_details.html', context)

