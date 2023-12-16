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
        # Getting the styles from the `Style` model and filtering them based on the selected category
        styles = Style.objects.filter(category=category_pk).select_related('category')
        # Filtering the `style_choices` from the form based on the `styles`
        style_choices = [(style.title, style.get_title_display()) for style in styles]
        # Changing the form fields based on the new `style_choices`
        selection_form.fields['style_choices'].choices = style_choices
        # Defining all possible search patterns
        search_pattern_styles = selection_form.cleaned_data['style_choices']
        search_pattern_metals = selection_form.cleaned_data['metal_choices']

        if search_pattern_styles:
            # Filtering the `style_names` - (objects) from the `Style` table, based on the selection
            style_names = Style.objects.filter(title__in=search_pattern_styles)
            # Getting the pks of the style objects
            style_ids = [s.pk for s in style_names]
            # Filtering the `JewelryDetails` objects based on the style pks in the `Jewelry` table
            jewelries = jewelries.filter(jewelry__style_id__in=style_ids)
            # `JewelryMetal` has a foreign key to `JewelryDetails` which has a foreign key to `Jewelry`
            # where the style pk is stored. Thus, we take the objects from the `JewelryMetal` that have
            # a pk of the respective `Jewelry` and filter the possible metals based on the selected style
            metals = JewelryMetal.objects.filter(jewelry__jewelry__style_id__in=style_ids).select_related('metal')
            # Because the objects might be more than one, we use set()
            metal_choices = set((metal.metal.title, metal.metal.get_title_display()) for metal in metals)
            # We give to the form the possible choices
            selection_form.fields['metal_choices'].choices = metal_choices

        elif search_pattern_metals:

            metal_names = Metal.objects.filter(title__in=search_pattern_metals)
            metal_ids = [m.pk for m in metal_names]

            jewelries = jewelries.filter(jewelry_metals__metal_id__in=metal_ids)

            styles = Style.objects.prefetch_related('style__jewelry__jewelry_metals').filter(
                style__jewelry__metals__in=metal_ids)

            style_choices = set((style.title, style.get_title_display()) for style in styles)
            selection_form.fields['style_choices'].choices = style_choices

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
