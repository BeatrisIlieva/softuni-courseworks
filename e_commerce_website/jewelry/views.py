from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from e_commerce_website.jewelry.forms import JewelryForm
from .models import JewelryDetails, Style, Metal

from django.db.models import Q

def show_jewelries(request, customer_gender_pk, category_pk):

    jewelries = JewelryDetails.objects.filter(Q(jewelry__customer_gender=customer_gender_pk),
                                              Q(jewelry__category=category_pk))
    selection_form = JewelryForm(request.GET)

    search_pattern = None

    if selection_form.is_valid():
        search_pattern_styles = selection_form.cleaned_data['style_choices']
        style_names = Style.objects.filter(title__in=search_pattern_styles)
        style_ids = [s.pk for s in style_names]

        search_pattern_metals = selection_form.cleaned_data['metal_choices']
        metal_names = Metal.objects.filter(title__in=search_pattern_metals)
        metal_ids = [m.pk for m in metal_names]


    # if search_pattern:
    #     jewelries = JewelryDetails.objects.filter(
    #         (Q(jewelry__customer_gender=customer_gender_pk) & Q(jewelry__category=category_pk))
    #         | (Q(jewelry__customer_gender=customer_gender_pk) & Q(jewelry__category=category_pk) & Q(jewelry__style_id__in=style_ids) & Q(
    #             jewelry_metals__metal_id__in=metal_ids))
    #         | (Q(jewelry__customer_gender=customer_gender_pk) & Q(jewelry__category=category_pk) & Q(
    #             jewelry_metals__metal_id__in=metal_ids))
    #         )

    if search_pattern_styles:
        query_style = Q(jewelry__style_id__in=style_ids)

    if search_pattern_metals:
        query_metals = Q(jewelry_metals__metal_id__in=metal_ids)

    if search_pattern_styles and search_pattern_metals:
        jewelries = jewelries.filter(query_style & query_metals)

    if search_pattern_styles:
        jewelries = jewelries.filter(query_style)

    if search_pattern_metals:
        jewelries = jewelries.filter(query_metals)




    context = {
        'jewelries': jewelries,
        'form': selection_form,
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

