from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import redirect
from django.urls import reverse

from django.views.generic import TemplateView, ListView, RedirectView

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.common.models import JewelryLike
from e_commerce_website.common.utils import get_object_pks
from e_commerce_website.jewelry.mixins import JewelryIsLikedByUserMixin
from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry
)


class IndexView(NavigationBarMixin, TemplateView):
    template_name = 'common/index_page.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()

        # if not cache.get('nav_bar_context'):
        #     cache.set('nav_bar_context', nav_bar_context, 30)

        # nav_bar_context = cache.get('nav_bar_context')

        context.update(nav_bar_context)

        return context


class SearchBarView(JewelryIsLikedByUserMixin, NavigationBarMixin, ListView):
    template_name = 'common/search_results.html'
    model = Jewelry
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


        self.set_liked_jewelries(self.request, queryset)

        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['search'] = self.request.GET.get('search', '')

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

class AddToLikedJewelriesView(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        jewelry_pk = self.kwargs.get('jewelry_pk')


        if self.request.user.pk:
            user_id = self.request.user.pk

            kwargs = {
                'jewelry_id': jewelry_pk,
                'user_id': user_id,
            }

            user_liked_jewelry = JewelryLike.objects \
                .filter(**kwargs).first()

            if user_liked_jewelry:
                user_liked_jewelry.delete()

            else:
                JewelryLike.objects.create(
                    **kwargs
                )

        else:

            liked_jewelries = self.request.session.get('liked_jewelries', [])

            if jewelry_pk in liked_jewelries:
                liked_jewelries.remove(jewelry_pk)

            else:

                liked_jewelries.append(jewelry_pk)

            self.request.session['liked_jewelries'] = liked_jewelries


            return reverse('display_liked_jewelries')



# @login_required
# def like_jewelry(request, jewelry_pk):
#     kwargs = {
#         'jewelry_id': jewelry_pk,
#         'user_id': request.user.pk,
#     }
#
#     user_liked_jewelry = JewelryLike.objects \
#         .filter(**kwargs).first()
#
#     if user_liked_jewelry:
#         user_liked_jewelry.delete()
#
#     else:
#         JewelryLike.objects.create(
#             **kwargs
#         )
#
#     return redirect('display_liked_jewelries', pk=request.user.pk)


class DisplayedLikedJewelries(NavigationBarMixin, ListView):
    model = Jewelry
    template_name = 'common/liked_jewelries.html'
    context_object_name = 'jewelries'
    paginate_by = 6

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.pk:

            likes_pks = JewelryLike.objects.filter(user_id=self.request.user.pk).values_list('jewelry_id', flat=True)

            queryset = queryset.filter(id__in=likes_pks)

            for jewelry in queryset:
                jewelry.liked_by_user = jewelry.jewelrylike_set.filter(user=self.request.user).exists()
        else:
            print(self.request.session['liked_jewelries'])
            liked_jewelries = self.request.session.get('liked_jewelries', [])
            likes_pks = liked_jewelries

            queryset = queryset.filter(id__in=likes_pks)

            for jewelry in queryset:
                jewelry.liked_by_user = jewelry.pk in liked_jewelries

        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        # last_viewed = self.request.session.get('last_viewed_jewelries', [])

        # # request.session._auth_user_id
        #
        # last_viewed.append(kwargs['jewelry_pk'])

        # self.request.session['last_viewed_jewelries'] = last_viewed
        # context.update(last_viewed)

        return context


def show_last_viewed(request, pk):
    last_viewed = request.session.get('last_viewed_jewelries', [])

    # request.session._auth_user_id

    last_viewed.append(pk)

    request.session['last_viewed_jewelries'] = last_viewed

