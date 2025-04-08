from django.core.cache import cache
from django.views import View
from django.views.decorators.cache import cache_page


from e_commerce_website.common.utils import get_objects_by_choices
from e_commerce_website.jewelry.models import Category, \
    Metal, \
    StoneType, \
    StoneColor
from e_commerce_website.wishlist.models import JewelryLike


# class CachedViewMixin:
#     @classmethod
#     def as_view(cls, **initkwargs):
#         view = super().as_view(**initkwargs)
#         return cache_page(30)(view)

class NavigationBarMixin(View):

    def get_nav_bar_context(self):
        context = {}

        categories_by_choices = get_objects_by_choices(Category)

        metals_by_choices = get_objects_by_choices(Metal)

        stone_types_by_choices = get_objects_by_choices(StoneType)

        stone_colors_by_choices = get_objects_by_choices(StoneColor)


        context['categories_by_choices'] = categories_by_choices
        context['metals_by_choices'] = metals_by_choices
        context['stone_types_by_choices'] = stone_types_by_choices
        context['stone_colors_by_choices'] = stone_colors_by_choices

        if self.request.user.pk:
            likes_count = JewelryLike.objects.filter(user_id=self.request.user.pk).count()
        else:
            likes_count = len(self.request.session.get('liked_jewelries', []))

        cart = self.request.session.get('cart', {})

        cart_count = len(cart)

        context['likes_count'] = likes_count
        context['cart_count'] = cart_count


        # if not cache.get('context'):
        #     cache.set('context', context, 30)
        #
        # context = cache.get('context')

        return context

