from e_commerce_website.common.utils import get_objects_by_choices
from e_commerce_website.jewelry.models import Category, Metal, StoneType, StoneColor





class NavigationBarMixin:
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

        return context
