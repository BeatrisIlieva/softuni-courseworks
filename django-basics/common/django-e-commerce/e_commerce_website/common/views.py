from django.db.models import Q
from django.contrib.auth import get_user_model
from django.views.generic import TemplateView, ListView, DetailView
from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.common.utils import get_object_pks
from e_commerce_website.jewelry.mixins import JewelryIsLikedByUserMixin, LastViewedJewelriesMixin
from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry
)

UserModel = get_user_model()

class IndexView(NavigationBarMixin, TemplateView):
    template_name = 'common/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()

        context.update(nav_bar_context)

        return context


class SearchBarView(
    LastViewedJewelriesMixin,
    JewelryIsLikedByUserMixin,
    NavigationBarMixin,
    ListView
):
    template_name = 'common/search-results.html'
    model = Jewelry
    paginate_by = 6

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.GET.get('search', '')

        query = Q()

        category_pks = get_object_pks(Category, search)

        if category_pks:
            query |= Q(
                Q(category_id__in=category_pks) &
                Q(inventory__quantity__gt=0)
            )

        metal_pks = get_object_pks(Metal, search)

        if metal_pks:
            query |= Q(
                Q(jewelry_metals__metal_id__in=metal_pks) &
                Q(inventory__quantity__gt=0)
            )

        stone_type_pks = get_object_pks(StoneType, search)

        if stone_type_pks:
            query |= Q(
                Q(jewelry_stones__stone_type_id__in=stone_type_pks) &
                Q(inventory__quantity__gt=0)
            )

        stone_color_pks = get_object_pks(StoneColor, search)

        if stone_color_pks:
            query |= Q(
                Q(jewelry_stones__stone_color_id__in=stone_color_pks) &
                Q(inventory__quantity__gt=0)
            )

        queryset = queryset.filter(
            query
        ).distinct('pk')

        self.set_liked_jewelries(self.request, queryset)

        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['search'] = self.request.GET.get('search', '')

        request_session = self.request.session
        last_viewed_jewelries = self.get_last_viewed_jewelries(request_session)
        context.update(last_viewed_jewelries)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context


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


def show_last_viewed(request, pk):
    last_viewed = request.session.get('last_viewed_jewelries', [])

    # request.session._auth_user_id

    last_viewed.append(pk)

    request.session['last_viewed_jewelries'] = last_viewed


class ProfileOptionsView(NavigationBarMixin, DetailView):
    template_name = 'common/profile-options.html'
    model = UserModel

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

class PasswordChangedSuccessfully(NavigationBarMixin, DetailView):
    template_name = 'common/password-changed.html'
    model = UserModel

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

class EmailChangedSuccessfully(NavigationBarMixin, DetailView):
    template_name = 'common/email-changed.html'
    model = UserModel

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

class DetailsChangedSuccessfully(NavigationBarMixin, DetailView):
    template_name = 'common/details-changed.html'
    model = UserModel

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

class ProfileDeletedSuccessfully(NavigationBarMixin, TemplateView):
    template_name = 'common/profile-deleted.html'
    model = UserModel

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context