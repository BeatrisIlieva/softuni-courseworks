from django.core.cache import cache
from django.views import View
from django.views.decorators.cache import cache_page


from e_commerce_website.common.utils import get_objects_by_choices
from e_commerce_website.jewelry.models import Category, \
    Metal, \
    StoneType, \
    StoneColor

class CachedViewMixin:
    @classmethod
    def as_view(cls, **initkwargs):
        view = super().as_view(**initkwargs)
        return cache_page(60 * 60)(view)

class NavigationBarMixin(CachedViewMixin, View):
    @staticmethod
    def get_nav_bar_context():
        context = {}

        categories_by_choices = get_objects_by_choices(Category)

        metals_by_choices = get_objects_by_choices(Metal)

        stone_types_by_choices = get_objects_by_choices(StoneType)

        stone_colors_by_choices = get_objects_by_choices(StoneColor)


        context['categories_by_choices'] = categories_by_choices
        context['metals_by_choices'] = metals_by_choices
        context['stone_types_by_choices'] = stone_types_by_choices
        context['stone_colors_by_choices'] = stone_colors_by_choices


        # context['categories_by_choices'] = '1'
        # context['metals_by_choices'] = '2'
        # context['stone_types_by_choices'] = '3'
        # context['stone_colors_by_choices'] = '4'

        if not cache.get('context'):
            cache.set('context', context, 30)

        context = cache.get('context')

        return context

