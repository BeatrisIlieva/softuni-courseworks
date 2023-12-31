from django.db.models import Q
from django.views.generic import TemplateView, ListView

from e_commerce_website.common.utils import get_objects_by_choices, get_object_pks
from e_commerce_website.jewelry.models import Category, Metal, StoneType, StoneColor, Jewelry


class NavigationBarView(TemplateView):
    template_name = 'common/index-page.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        categories_by_choices = get_objects_by_choices(Category)

        metals_by_choices = get_objects_by_choices(Metal)

        stone_types_by_choices = get_objects_by_choices(StoneType)

        stone_colors_by_choices = get_objects_by_choices(StoneColor)

        context['categories_by_choices'] = categories_by_choices
        context['metals_by_choices'] = metals_by_choices
        context['stone_types_by_choices'] = stone_types_by_choices
        context['stone_colors_by_choices'] = stone_colors_by_choices

        return context


class SearchBarView(ListView):
    template_name = 'common/search_results.html'
    model = Jewelry
    context_object_name = 'jewelries'
    paginate_by = 6

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.GET.get('search', '')

        query = Q()

        category_ids = get_object_pks(Category, search)

        if category_ids:
            query |= Q(category_id__in=category_ids)

        metal_ids = get_object_pks(Metal, search)

        if metal_ids:
            query |= Q(jewelry_metals__metal_id__in=metal_ids)

        stone_type_ids = get_object_pks(StoneType, search)

        if stone_type_ids:
            query |= Q(jewelry_stones__stone_type_id__in=stone_type_ids)

        stone_color_ids = get_object_pks(StoneColor, search)

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
