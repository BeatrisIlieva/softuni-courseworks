from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView, ListView

from e_commerce_website.jewelry.models import Category, Metal, StoneType, StoneColor, Jewelry


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

class SearchBarView(ListView):
    template_name = 'common/index-page.html'
    model = Jewelry
    paginate_by = 6

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.GET.get('search', '')
        # print(search)
        metals = Metal.objects.all()

        options = [(metal.title, metal.get_title_display()) for metal in metals if
                   search in metal.get_title_display().lower() or search in metal.get_title_display()]

        valid_options = [o[0] for o in options]

        metal_titles = Metal.objects. \
            filter(title__in=valid_options)

        metal_ids = [m.id for m in metal_titles]

        queryset = queryset.filter(
            jewelry_metals__metal_id__in=metal_ids
        )
        print(queryset)
        return queryset
