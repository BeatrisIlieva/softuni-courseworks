from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView

from e_commerce_website.jewelry.models import Category, Metal, StoneType, StoneColor


class NavigationBarView(TemplateView):
    template_name = 'common/index-page.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        categories = Category.objects.all()
        categories_choices = [x[1] for x in Category.TitleChoices.choices]

        categories_by_choices = {}

        index = 0

        for category in categories:
            categories_by_choices[category] = categories_choices[index]
            index += 1

        metals = Metal.TitleChoices.choices

        stones = StoneType.TitleChoices.choices

        colors = StoneColor.TitleChoices.choices

        context['categories_by_choices'] = categories_by_choices
        context['metals'] = metals
        context['stones'] = stones
        context['colors'] = colors

        return context

# def get_nav_bar_context():
#     categories = Category.objects.all()
#     categories_choices = [x[1] for x in Category.TitleChoices.choices]
#
#     categories_by_choices = {}
#
#     index = 0
#
#     for category in categories:
#         categories_by_choices[category] = categories_choices[index]
#         index += 1
#
#     metals = Metal.TitleChoices.choices
#
#     stones = StoneType.TitleChoices.choices
#
#     colors = StoneColor.TitleChoices.choices
#
#     context = {
#         'categories_by_choices': categories_by_choices,
#         'metals': metals,
#         'stones': stones,
#         'colors': colors,
#     }
#
#     return context
#
#
# def index_page(request):
#     context = get_nav_bar_context()
#
#     return render(request, 'common/index-page.html', context)

# from django import forms
# from django.shortcuts import render

# from e_commerce_website.jewelry.models import Category

# class IndexForm(forms.Form):
#     categories = Category.TitleChoices

#     category = forms.ChoiceField(
#         choices=categories,
#         required=False,
#         widget=forms.CheckboxSelectMultiple(),
#     )

# def index_page(request):

#     if request.method == 'get':
#         form = IndexForm()

#     else:
#         form = IndexForm(request.POST)

#     context = {
#         'form': form,
#     }

#     return render(request, 'common/index-page.html', context)
