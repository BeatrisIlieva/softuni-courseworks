from django.db.models import Q
from django.views.generic import TemplateView, ListView

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.common.utils import get_object_pks
from e_commerce_website.jewelry.models import Category, Metal, StoneType, StoneColor, Jewelry


class NavigationBarView(NavigationBarMixin, TemplateView):
    template_name = 'common/index_page.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)
        return context


class SearchBarView(NavigationBarMixin, ListView):
    template_name = 'common/search_results.html'
    model = Jewelry
    context_object_name = 'jewelries'
    paginate_by = 6

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.GET.get('search', '')

        query = Q()

        category_pks = get_object_pks(Category, search)

        if category_pks:
            query |= Q(category_id__in=category_pks)

        metal_pks = get_object_pks(Metal, search)

        if metal_pks:
            query |= Q(jewelry_metals__metal_id__in=metal_pks)

        stone_type_pks = get_object_pks(StoneType, search)

        if stone_type_pks:
            query |= Q(jewelry_stones__stone_type_id__in=stone_type_pks)

        stone_color_pks = get_object_pks(StoneColor, search)

        if stone_color_pks:
            query |= Q(jewelry_stones__stone_color_id__in=stone_color_pks)

        queryset = queryset.filter(
            query
        ).distinct('pk')

        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['search'] = self.request.GET.get('search', '')

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context
