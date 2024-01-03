from django.db.models import Q
from django.views.generic import DetailView

from e_commerce_website.jewelry.models import Jewelry

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
    get_related_choices

from e_commerce_website.jewelry.mixins import \
    DisplayJewelryMixin




class DisplayJewelriesByCategoryView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_category.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryCategoryForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']

        self.query &= Q(
            category=choice_pk,
            sold_out=False
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        self.update_related_objects(jewelries)

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

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['form'] = \
            self.selection_form

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_metal'] = \
            self.jewelries_count_by_metal

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries):
        metals = \
            self.define_related_metal_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)
        self.jewelries_count_by_metal = \
            self.define_jewelries_count_by_metal(jewelries, metals)
        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        price_choices = \
            self.define_price_choices(jewelries)

        metal_choices = \
            self.define_metal_choices(metals)

        stone_type_choices = \
            self.define_stone_type_choices(stone_types)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                metal_choices=metal_choices,
                stone_type_choices=stone_type_choices
            )


class DisplayJewelriesByMetalView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_metal.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryMetalForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']

        self.query &= Q(
            metals__exact=choice_pk,
            sold_out=False
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        self.update_related_objects(jewelries)

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

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['form'] = \
            self.selection_form

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries):
        categories = \
            self.define_related_category_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        price_choices = \
            self.define_price_choices(jewelries)

        category_choices = \
            self.define_category_choices(categories)

        stone_type_choices = \
            self.define_stone_type_choices(stone_types)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                category_choices=category_choices,
                stone_type_choices=stone_type_choices
            )


class DisplayJewelriesByStoneTypeView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_stone_type.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryStoneTypeForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']

        self.query &= Q(
            stone_types__exact=choice_pk,
            sold_out=False
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        self.update_related_objects(jewelries)

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

            selection_pattern_stone_colors = \
                self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_stone_colors:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_colors=selection_pattern_stone_colors
                )

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['form'] = \
            self.selection_form

        context['jewelries_count_by_stone_color'] = \
            self.jewelries_count_by_stone_color

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries):
        categories = \
            self.define_related_category_objects(jewelries)

        stone_colors = \
            self.define_related_stone_color_objects(jewelries)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        self.jewelries_count_by_stone_color = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_colors)

        price_choices = \
            self.define_price_choices(jewelries)

        category_choices = \
            self.define_category_choices(categories)

        stone_color_choices = \
            self.define_stone_color_choices(stone_colors)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                category_choices=category_choices,
                stone_color_choices=stone_color_choices
            )


class DisplayJewelriesByStoneColorView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_stone_color.html'

    def get_queryset(self):
        self.selection_form = \
            JewelryStoneColorForm(self.request.GET)

        choice_pk = self.kwargs['choice_pk']

        self.query &= Q(
            stone_colors__exact=choice_pk,
            sold_out=False
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        self.update_related_objects(jewelries)

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
                    selection_pattern_stone_colors=selection_pattern_stone_types
                )

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['choice_pk'] = \
            self.kwargs['choice_pk']

        context['form'] = \
            self.selection_form

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(self, jewelries):
        categories = \
            self.define_related_category_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        price_choices = \
            self.define_price_choices(jewelries)

        category_choices = \
            self.define_category_choices(categories)

        stone_type_choices = \
            self.define_stone_color_choices(stone_types)

        self.selection_form = \
            self.update_selection_form(
                self.selection_form,
                price_choices=price_choices,
                category_choices=category_choices,
                stone_type_choices=stone_type_choices
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

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context
