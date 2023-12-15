from django.shortcuts import render

from e_commerce_website.common.views import get_nav_bar_context
from .forms import JewelryForm
from .models import JewelryDetails, Style, Metal, JewelryMetal

from django.db.models import Q


def show_jewelries(request, customer_gender_pk, category_pk):
    jewelries = JewelryDetails.objects.filter(
        Q(jewelry__customer_gender=customer_gender_pk),
        Q(jewelry__category=category_pk)
    )

    selection_form = JewelryForm(request.GET)

    if selection_form.is_valid():
        styles = Style.objects.filter(category=category_pk).select_related('category')
        style_choices = [(style.title, style.get_title_display()) for style in styles]

        selection_form.fields['style_choices'].choices = style_choices

        search_pattern_styles = selection_form.cleaned_data['style_choices']
        search_pattern_metals = selection_form.cleaned_data['metal_choices']

        if search_pattern_styles:
            style_names = Style.objects.filter(title__in=search_pattern_styles)
            style_ids = [s.pk for s in style_names]

            jewelries = jewelries.filter(jewelry__style_id__in=style_ids)

            metals = JewelryMetal.objects.filter(jewelry__jewelry__style_id__in=style_ids).select_related('metal')
            metal_choices = set((metal.metal.title, metal.metal.get_title_display()) for metal in metals)

            selection_form.fields['metal_choices'].choices = metal_choices

        elif search_pattern_metals:
            metal_names = Metal.objects.filter(title__in=search_pattern_metals)
            metal_ids = [m.pk for m in metal_names]

            jewelries = jewelries.filter(jewelry_metals__metal_id__in=metal_ids)

    # if search_pattern_styles:
    #     query_style = Q(jewelry__style_id__in=style_ids)
    #
    # if search_pattern_metals:
    #     query_metals = Q(jewelry_metals__metal_id__in=metal_ids)
    #
    # if search_pattern_styles and search_pattern_metals:
    #     jewelries = jewelries.filter(query_style & query_metals)
    #
    # if search_pattern_styles:
    #     jewelries = jewelries.filter(query_style)
    #
    # if search_pattern_metals:
    #     jewelries = jewelries.filter(query_metals)

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
