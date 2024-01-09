from urllib.parse import urlencode

from django.db.models import Q
from django.shortcuts import render, redirect
from django.views.generic import DetailView

from e_commerce_website.jewelry.mixins import DisplayJewelryMixin
from e_commerce_website.jewelry.models import Jewelry, StoneType, StoneColor

from e_commerce_website.common.mixins import \
    NavigationBarMixin

from e_commerce_website.jewelry.forms import \
    JewelryDetailsForm, \
    JewelryCategoryForm, \
    JewelryMetalForm, \
    JewelryStoneTypeForm, \
    JewelryStoneColorForm

from e_commerce_website.jewelry.funcs import \
    get_related_size_objects, \
    get_related_choices, get_stone_type_pks, get_stone_color_pks


class DisplayJewelriesByCategoryView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_category.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryCategoryForm(self.request.GET)


        choice_pk = self.kwargs['choice_pk']

        stone_color_pk = None
        stone_type_pk = None

        self.query &= Q(
            category=choice_pk,
            inventory__quantity__gt=0

        )


        queryset = super().get_queryset(). \
            filter(self.query). \
            distinct('pk')

        self.update_related_objects(queryset, stone_type_pk, stone_color_pk)

        if self.selection_form.is_valid():

            selection_pattern_price = \
                self.selection_form.cleaned_data['price_choices']

            if selection_pattern_price:
                self.query &= self.update_query_mixin(
                    selection_pattern_price=selection_pattern_price,
                )

            selection_pattern_metals = \
                self.selection_form.cleaned_data['metal_choices']

            if selection_pattern_metals:
                self.query &= self.update_query_mixin(
                    selection_pattern_metals=selection_pattern_metals
                )

            selection_pattern_stone_types = \
                self.selection_form.cleaned_data['stone_type_choices']

            if selection_pattern_stone_types:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_types=selection_pattern_stone_types
                )

                stone_type_pk = get_stone_type_pks(selection_pattern_stone_types)
                stone_color_pk = self.define_related_stone_color_objects(queryset, stone_type_pk)

            selection_pattern_stone_colors = \
                self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_stone_colors:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_colors=selection_pattern_stone_colors
                )

                stone_color_pk = get_stone_color_pks(selection_pattern_stone_colors)
                stone_type_pk = self.define_related_stone_type_objects(queryset, stone_color_pk)

            queryset = queryset. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(queryset, stone_type_pk, stone_color_pk)

        # for jewelry in queryset:
        #     jewelry.liked_by_user = jewelry.jewelrylike_set.filter(user=self.request.user).exists()

        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['form'] = self.selection_form

        form_data = self.request.GET.copy() if self.request.GET else {}
        form_data.pop('page', None)
        page_number = self.request.GET.get('page', 1)
        form_data_encoded = urlencode(form_data) + '&' if form_data else ''
        context['form_data_encoded'] = form_data_encoded
        context['page_number'] = page_number

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_stone_color'] = \
            self.jewelries_count_by_stone_color

        context['jewelries_count_by_metal'] = \
            self.jewelries_count_by_metal

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, queryset, stone_type_pk, stone_color_pk):

        metals = \
            self.define_related_metal_objects(queryset)

        stone_types = \
            self.define_related_stone_type_objects(queryset, stone_color_pk)

        stone_colors = \
            self.define_related_stone_color_objects(queryset, stone_type_pk)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(queryset)

        self.jewelries_count_by_metal = \
            self.define_jewelries_count_by_metal(queryset, metals)

        if stone_type_pk is not None:
            stone_types = StoneType.objects.filter(id__in=stone_type_pk)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(queryset, stone_types)

        if stone_color_pk is not None:
            stone_colors = StoneColor.objects.filter(id__in=stone_color_pk)

        self.jewelries_count_by_stone_color = \
            self.define_jewelries_count_by_stone_color(queryset, stone_colors)

        price_choices = \
            self.define_price_choices(queryset)

        metal_choices = \
            self.define_metal_choices(metals)

        stone_type_choices = \
            self.define_stone_type_choices(stone_types)

        stone_color_choices = \
            self.define_stone_color_choices(stone_colors)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                metal_choices=metal_choices,
                stone_type_choices=stone_type_choices,
                stone_color_choices=stone_color_choices,
            )


class DisplayJewelriesByMetalView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_metal.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryMetalForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']

        stone_type_pk = None
        stone_color_pk = None

        self.query &= Q(
            metals__exact=choice_pk,
            inventory__quantity__gt=0
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        self.update_related_objects(jewelries, stone_type_pk, stone_color_pk)

        if self.selection_form.is_valid():

            selection_pattern_price = \
                self.selection_form.cleaned_data['price_choices']

            if selection_pattern_price:
                self.query &= self.update_query_mixin(
                    selection_pattern_price=selection_pattern_price,
                )

            selection_pattern_category = \
                self.selection_form.cleaned_data['category_choices']

            if selection_pattern_category:
                self.query &= self.update_query_mixin(
                    selection_pattern_category=selection_pattern_category
                )

            selection_pattern_stone_types = \
                self.selection_form.cleaned_data['stone_type_choices']

            if selection_pattern_stone_types:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_types=selection_pattern_stone_types
                )

                stone_type_pk = get_stone_type_pks(selection_pattern_stone_types)
                stone_color_pk = self.define_related_stone_color_objects(jewelries, stone_type_pk)

            selection_pattern_stone_colors = \
                self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_stone_colors:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_colors=selection_pattern_stone_colors
                )

                stone_color_pk = get_stone_color_pks(selection_pattern_stone_colors)
                stone_type_pk = self.define_related_stone_type_objects(jewelries, stone_color_pk)

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries, stone_type_pk, stone_color_pk)

        for jewelry in jewelries:
            jewelry.liked_by_user = jewelry.jewelrylike_set.filter(user=self.request.user).exists()

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['form'] = self.selection_form

        form_data = self.request.GET.copy() if self.request.GET else {}
        form_data.pop('page', None)
        page_number = self.request.GET.get('page', 1)
        form_data_encoded = urlencode(form_data) + '&' if form_data else ''
        context['form_data_encoded'] = form_data_encoded
        context['page_number'] = page_number

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_stone_color'] = \
            self.jewelries_count_by_stone_color

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries, stone_type_pk, stone_color_pk):
        categories = \
            self.define_related_category_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries, stone_color_pk)

        stone_colors = \
            self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        if stone_type_pk is not None:
            stone_types = StoneType.objects.filter(id__in=stone_type_pk)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        if stone_color_pk is not None:
            stone_colors = StoneColor.objects.filter(id__in=stone_color_pk)

        self.jewelries_count_by_stone_color = \
            self.define_jewelries_count_by_stone_color(jewelries, stone_colors)

        price_choices = \
            self.define_price_choices(jewelries)

        category_choices = \
            self.define_category_choices(categories)

        stone_type_choices = \
            self.define_stone_type_choices(stone_types)

        stone_color_choices = \
            self.define_stone_color_choices(stone_colors)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                category_choices=category_choices,
                stone_type_choices=stone_type_choices,
                stone_color_choices=stone_color_choices,
            )


class DisplayJewelriesByStoneTypeView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_stone_type.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryStoneTypeForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']
        stone_type_pk = [choice_pk]

        self.query &= Q(
            stone_types__exact=choice_pk,
            inventory__quantity__gt=0
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        stone_color_pk = self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.update_related_objects(jewelries, stone_type_pk, stone_color_pk)

        if self.selection_form.is_valid():

            selection_pattern_price = \
                self.selection_form.cleaned_data['price_choices']

            if selection_pattern_price:
                self.query &= self.update_query_mixin(
                    selection_pattern_price=selection_pattern_price,
                )

            selection_pattern_category = \
                self.selection_form.cleaned_data['category_choices']

            if selection_pattern_category:
                self.query &= self.update_query_mixin(
                    selection_pattern_category=selection_pattern_category
                )

            selection_pattern_metals = \
                self.selection_form.cleaned_data['metal_choices']

            if selection_pattern_metals:
                self.query &= self.update_query_mixin(
                    selection_pattern_metals=selection_pattern_metals
                )

            selection_pattern_stone_colors = \
                self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_stone_colors:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_colors=selection_pattern_stone_colors
                )
                stone_color_pk = get_stone_color_pks(selection_pattern_stone_colors)
                stone_type_pk = self.define_related_stone_type_objects(jewelries, stone_color_pk)

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries, stone_type_pk, stone_color_pk)

        # for jewelry in jewelries:
        #     jewelry.liked_by_user = jewelry.jewelrylike_set.filter(user=self.request.user).exists()

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['form'] = self.selection_form

        form_data = self.request.GET.copy() if self.request.GET else {}
        form_data.pop('page', None)
        page_number = self.request.GET.get('page', 1)
        form_data_encoded = urlencode(form_data) + '&' if form_data else ''
        context['form_data_encoded'] = form_data_encoded
        context['page_number'] = page_number

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['jewelries_count_by_stone_color'] = \
            self.jewelries_count_by_stone_color

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_metal'] = \
            self.jewelries_count_by_metal

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries, stone_type_pk, stone_color_pk):
        categories = \
            self.define_related_category_objects(jewelries)

        metals = \
            self.define_related_metal_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries, stone_color_pk)

        stone_colors = \
            self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        self.jewelries_count_by_metal = \
            self.define_jewelries_count_by_metal(jewelries, metals)

        if stone_type_pk is not None:
            stone_types = StoneType.objects.filter(id__in=stone_type_pk)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        if stone_color_pk is not None:
            stone_colors = StoneColor.objects.filter(id__in=stone_color_pk)

        self.jewelries_count_by_stone_color = \
            self.define_jewelries_count_by_stone_color(jewelries, stone_colors)

        price_choices = \
            self.define_price_choices(jewelries)

        category_choices = \
            self.define_category_choices(categories)

        metal_choices = \
            self.define_metal_choices(metals)

        stone_color_choices = \
            self.define_stone_color_choices(stone_colors)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                category_choices=category_choices,
                metal_choices=metal_choices,
                stone_color_choices=stone_color_choices,
            )


class DisplayJewelriesByStoneColorView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_stone_color.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryStoneColorForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']
        stone_color_pk = [choice_pk]

        self.query &= Q(
            stone_colors__exact=choice_pk,
            inventory__quantity__gt=0
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        stone_type_pk = self.define_related_stone_type_objects(jewelries, stone_color_pk)

        self.update_related_objects(jewelries, stone_color_pk, stone_type_pk)

        if self.selection_form.is_valid():

            selection_pattern_price = \
                self.selection_form.cleaned_data['price_choices']

            if selection_pattern_price:
                self.query &= self.update_query_mixin(
                    selection_pattern_price=selection_pattern_price,
                )

            selection_pattern_category = \
                self.selection_form.cleaned_data['category_choices']

            if selection_pattern_category:
                self.query &= self.update_query_mixin(
                    selection_pattern_category=selection_pattern_category
                )

            selection_pattern_metals = \
                self.selection_form.cleaned_data['metal_choices']

            if selection_pattern_metals:
                self.query &= self.update_query_mixin(
                    selection_pattern_metals=selection_pattern_metals
                )

            selection_pattern_stone_types = \
                self.selection_form.cleaned_data['stone_type_choices']

            if selection_pattern_stone_types:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_types=selection_pattern_stone_types
                )

                stone_type_pk = get_stone_type_pks(selection_pattern_stone_types)
                stone_color_pk = self.define_related_stone_color_objects(jewelries, stone_type_pk)

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries, stone_color_pk, stone_type_pk)

        # for jewelry in jewelries:
        #     jewelry.liked_by_user = jewelry.jewelrylike_set.filter(user=self.request.user).exists()

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['form'] = self.selection_form

        form_data = self.request.GET.copy() if self.request.GET else {}
        form_data.pop('page', None)
        page_number = self.request.GET.get('page', 1)
        form_data_encoded = urlencode(form_data) + '&' if form_data else ''
        context['form_data_encoded'] = form_data_encoded
        context['page_number'] = page_number

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_metal'] = \
            self.jewelries_count_by_metal

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries, stone_color_pk, stone_type_pk):
        categories = \
            self.define_related_category_objects(jewelries)

        metals = \
            self.define_related_metal_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries, stone_color_pk)

        stone_colors = \
            self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        self.jewelries_count_by_metal = \
            self.define_jewelries_count_by_metal(jewelries, metals)

        if stone_type_pk is not None:
            stone_types = StoneType.objects.filter(id__in=stone_type_pk)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        if stone_color_pk is not None:
            stone_colors = StoneColor.objects.filter(id__in=stone_color_pk)

        self.jewelries_count_by_stone_color = \
            self.define_jewelries_count_by_stone_color(jewelries, stone_colors)

        price_choices = \
            self.define_price_choices(jewelries)

        category_choices = \
            self.define_category_choices(categories)

        metal_choices = \
            self.define_metal_choices(metals)

        stone_type_choices = \
            self.define_stone_type_choices(stone_types)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                category_choices=category_choices,
                metal_choices=metal_choices,
                stone_type_choices=stone_type_choices,
            )


class JewelryDetailsView(NavigationBarMixin, DetailView):
    model = Jewelry
    template_name = 'jewelry/jewelry_details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        selection_form = JewelryDetailsForm(self.request.GET)
        sizes = get_related_size_objects(self.get_object())
        size_choices = get_related_choices(sizes, field_name='measurement')

        if selection_form.is_valid():
            selection_form.fields['sizes'].choices = size_choices

        context['form'] = selection_form

        last_viewed_jewelries = self.request.session.get('last_viewed_jewelries', [])
        last_viewed_jewelries = Jewelry.objects.filter(id__in=last_viewed_jewelries)
        context['last_viewed_jewelries'] = last_viewed_jewelries


        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

def view_jewelry(request, pk):
    jewelry = Jewelry.objects.get(pk=pk)
    last_viewed_jewelries = request.session.get('last_viewed_jewelries', [])

    if jewelry.pk in last_viewed_jewelries:
        last_viewed_jewelries.remove(jewelry.pk)

    last_viewed_jewelries.append(jewelry.pk)

    start_index = max(
        0,
        len(last_viewed_jewelries) - 3,
    )

    # request.session.set_expiry(5 * 60) changes the expiry date; it can be set to a date as well
    request.session['last_viewed_jewelries'] = last_viewed_jewelries[start_index:]

    return redirect('display_jewelry_details', pk=pk)





