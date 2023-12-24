from django.db.models import Q
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

        query = Q()

        categories = Category.objects.all()

        options = [(category.title, category.get_title_display()) for category in categories if
                   search in category.get_title_display().lower() or search in category.get_title_display()]

        valid_options = [o[0] for o in options]

        category_titles = Category.objects. \
            filter(title__in=valid_options)

        category_ids = [c.id for c in category_titles]

        if category_ids:
            query |= Q(category_id__in=category_ids)

        metals = Metal.objects.all()

        options = [(metal.title, metal.get_title_display()) for metal in metals if
                   search in metal.get_title_display().lower() or search in metal.get_title_display()]

        valid_options = [o[0] for o in options]

        metal_titles = Metal.objects. \
            filter(title__in=valid_options)

        metal_ids = [m.id for m in metal_titles]

        if metal_ids:
            query |= Q(jewelry_metals__metal_id__in=metal_ids)

        stone_types = StoneType.objects.all()

        options = [(stone_type.title, stone_type.get_title_display()) for stone_type in stone_types if
                   search in stone_type.get_title_display().lower() or search in stone_type.get_title_display()]

        valid_options = [o[0] for o in options]

        stone_type_titles = StoneType.objects. \
            filter(title__in=valid_options)

        stone_type_ids = [s.id for s in stone_type_titles]

        if stone_type_ids:
            query |= Q(jewelry_stones__stone_type_id__in=stone_type_ids)

        stone_colors = StoneColor.objects.all()

        options = [(stone_color.title, stone_color.get_title_display()) for stone_color in stone_colors if
                   search in stone_color.get_title_display().lower() or search in stone_color.get_title_display()]

        valid_options = [o[0] for o in options]

        stone_color_titles = StoneColor.objects. \
            filter(title__in=valid_options)

        stone_color_ids = [s.id for s in stone_color_titles]

        if stone_color_ids:
            query |= Q(jewelry_stones__stone_color_id__in=stone_color_ids)

        queryset = queryset.filter(
            query
        ).distinct('id')

        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['search'] = self.request.GET.get('search', '')

        navigation_view = NavigationBarView()
        navigation_bar_context = navigation_view.get_context_data()

        context.update(navigation_bar_context)

        return context
