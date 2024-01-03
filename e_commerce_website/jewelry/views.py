from django.db.models import Q
from django.views.generic import DetailView, ListView

from e_commerce_website.common.mixins import NavigationBarMixin

from e_commerce_website.jewelry.forms import JewelryForm, JewelryDetailsForm, JewelryCategoryForm
from e_commerce_website.jewelry.funcs import define_jewelries_count_by_selected_price, get_related_category_objects, \
    define_jewelries_count_by_selected_category, get_related_metal_objects, \
    define_jewelries_count_by_selected_metal, get_related_stone_type_objects, \
    define_jewelries_count_by_selected_stone_type, \
    define_jewelries_count_by_selected_stone_color, show_available_prices, update_selection_forms, \
    get_query_price, display_jewelries_after_selection, get_category_pks, get_metal_pks, get_stone_type_pks, \
    get_stone_color_pks, get_related_size_objects, get_related_choices, get_related_stone_color_objects
from e_commerce_website.jewelry.mixins import DefineCountsMixin, DefineChoicesMixin, UpdateSelectionFormMixin, \
    UpdateQueryMixin, DefineRelatedObjectsMixin

from e_commerce_website.jewelry.models import Jewelry


# class SelectionFormMixin:
#     query = Q()
#     jewelries_count_by_category = {}
#     jewelries_count_by_metal = {}
#     jewelries_count_by_stone_type = {}
#     jewelries_count_by_stone_color = {}
#     jewelries_count_by_price = {}
#     selection_form = None
#     category_pk = None
#
#     def get_selection_form(self, request, form, jewelries):
#         self.selection_form = form(request.GET)
#
#         self.jewelries_count_by_price = define_jewelries_count_by_selected_price(jewelries)
#
#         # categories = get_related_category_objects(jewelries)
#         # self.jewelries_count_by_category = define_jewelries_count_by_selected_category(jewelries, categories)
#
#         metals = get_related_metal_objects(jewelries)
#         self.jewelries_count_by_metal = define_jewelries_count_by_selected_metal(jewelries, metals)
#
#         stone_types = get_related_stone_type_objects(jewelries)
#         self.jewelries_count_by_stone_type = define_jewelries_count_by_selected_stone_type(jewelries, stone_types)
#
#         # stone_colors = get_related_stone_color_objects(jewelries)
#         # self.jewelries_count_by_stone_color = define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)
#
#         # category_choices = get_related_choices(categories, field_name='title')
#         metal_choices = get_related_choices(metals, field_name='title')
#         stone_type_choices = get_related_choices(stone_types, field_name='title')
#         # stone_color_choices = get_related_choices(stone_colors, field_name='title')
#         price_choices = show_available_prices(jewelries)
#
#         update_selection_forms(
#             self.selection_form,
#             # category_choices=category_choices,
#             metal_choices=metal_choices,
#             stone_type_choices=stone_type_choices,
#             # stone_color_choices=stone_color_choices,
#             price_choices=price_choices,
#         )
#
#         if self.selection_form.is_valid():
#
#             selection_pattern_price = self.selection_form.cleaned_data['price_choices']
#
#             # selection_pattern_category = self.selection_form.cleaned_data['category_choices']
#
#             selection_pattern_metals = self.selection_form.cleaned_data['metal_choices']
#
#             selection_pattern_stone_types = self.selection_form.cleaned_data['stone_type_choices']
#
#             # selection_pattern_stone_colors = self.selection_form.cleaned_data['stone_color_choices']
#
#             if selection_pattern_price:
#                 self.query &= Q(get_query_price(
#                     selection_pattern_price
#                 )
#                 )
#
#                 self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#                     display_jewelries_after_selection(self.selection_form, jewelries)
#
#             # if selection_pattern_category:
#             #     self.query &= Q(category_id__in=get_category_pks(
#             #         selection_pattern_category
#             #     )
#             #     )
#             #
#             #     self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#             #         display_jewelries_after_selection(self.selection_form, jewelries)
#
#             if selection_pattern_metals:
#                 self.query &= Q(jewelry_metals__metal_id__in=get_metal_pks(
#                     selection_pattern_metals
#                 )
#                 )
#
#                 self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#                     display_jewelries_after_selection(self.selection_form, jewelries)
#
#             if selection_pattern_stone_types:
#                 self.query &= Q(jewelry_stones__stone_type_id__in=get_stone_type_pks(
#                     selection_pattern_stone_types
#                 )
#                 )
#
#                 self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#                     display_jewelries_after_selection(self.selection_form, jewelries)
#
#             # if selection_pattern_stone_colors:
#             #     self.query &= Q(
#             #         jewelry_stones__stone_color_id__in=get_stone_color_pks(
#             #             selection_pattern_stone_colors
#             #         )
#             #     )
#             #
#             #     self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#             #         display_jewelries_after_selection(self.selection_form, jewelries)
#
#             return self.selection_form
#
#     # def get_selection_form(self, request, form, jewelries):
#     #     self.selection_form = form(request.GET)
#     #
#     #     self.jewelries_count_by_price = define_jewelries_count_by_selected_price(jewelries)
#     #
#     #     categories = get_related_category_objects(jewelries)
#     #     self.jewelries_count_by_category = define_jewelries_count_by_selected_category(jewelries, categories)
#     #
#     #     metals = get_related_metal_objects(jewelries)
#     #     self.jewelries_count_by_metal = define_jewelries_count_by_selected_metal(jewelries, metals)
#     #
#     #     stone_types = get_related_stone_type_objects(jewelries)
#     #     self.jewelries_count_by_stone_type = define_jewelries_count_by_selected_stone_type(jewelries, stone_types)
#     #
#     #     stone_colors = get_related_stone_color_objects(jewelries)
#     #     self.jewelries_count_by_stone_color = define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)
#     #
#     #     category_choices = get_related_choices(categories, field_name='title')
#     #     metal_choices = get_related_choices(metals, field_name='title')
#     #     stone_type_choices = get_related_choices(stone_types, field_name='title')
#     #     stone_color_choices = get_related_choices(stone_colors, field_name='title')
#     #     price_choices = show_available_prices(jewelries)
#     #
#     #     update_selection_forms(
#     #         self.selection_form,
#     #         category_choices=category_choices,
#     #         metal_choices=metal_choices,
#     #         stone_type_choices=stone_type_choices,
#     #         stone_color_choices=stone_color_choices,
#     #         price_choices=price_choices,
#     #     )
#     #
#     #     if self.selection_form.is_valid():
#     #
#     #         selection_pattern_price = self.selection_form.cleaned_data['price_choices']
#     #
#     #         selection_pattern_category = self.selection_form.cleaned_data['category_choices']
#     #
#     #         selection_pattern_metals = self.selection_form.cleaned_data['metal_choices']
#     #
#     #         selection_pattern_stone_types = self.selection_form.cleaned_data['stone_type_choices']
#     #
#     #         selection_pattern_stone_colors = self.selection_form.cleaned_data['stone_color_choices']
#     #
#     #         if selection_pattern_price:
#     #             self.query &= Q(get_query_price(
#     #                 selection_pattern_price
#     #             )
#     #             )
#     #
#     #             self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#     #                 display_jewelries_after_selection(self.selection_form, jewelries)
#     #
#     #         if selection_pattern_category:
#     #             self.query &= Q(category_id__in=get_category_pks(
#     #                 selection_pattern_category
#     #             )
#     #             )
#     #
#     #             self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#     #                 display_jewelries_after_selection(self.selection_form, jewelries)
#     #
#     #         if selection_pattern_metals:
#     #             self.query &= Q(jewelry_metals__metal_id__in=get_metal_pks(
#     #                 selection_pattern_metals
#     #             )
#     #             )
#     #
#     #             self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#     #                 display_jewelries_after_selection(self.selection_form, jewelries)
#     #
#     #         if selection_pattern_stone_types:
#     #             self.query &= Q(jewelry_stones__stone_type_id__in=get_stone_type_pks(
#     #                 selection_pattern_stone_types
#     #             )
#     #             )
#     #
#     #             self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#     #                 display_jewelries_after_selection(self.selection_form, jewelries)
#     #
#     #         if selection_pattern_stone_colors:
#     #             self.query &= Q(
#     #                 jewelry_stones__stone_color_id__in=get_stone_color_pks(
#     #                     selection_pattern_stone_colors
#     #                 )
#     #             )
#     #
#     #             self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
#     #                 display_jewelries_after_selection(self.selection_form, jewelries)
#     #
#     #         return self.selection_form


class DisplayJewelryMixin(DefineRelatedObjectsMixin, UpdateQueryMixin, UpdateSelectionFormMixin, DefineChoicesMixin,
                          DefineCountsMixin, NavigationBarMixin, ListView):
    model = Jewelry
    context_object_name = 'jewelries'
    paginate_by = 6
    selection_form = None
    query = Q()
    jewelries_count_by_price = {}
    jewelries_count_by_metal = {}
    jewelries_count_by_stone_type = {}


class DisplayJewelriesByCategoryView(DisplayJewelryMixin):
    template_name = 'jewelry/display_jewelries_by_category.html'

    def get_queryset(self):
        self.selection_form = JewelryCategoryForm(self.request.GET)
        category_pk = self.kwargs['category_pk']
        self.query &= Q(category=category_pk, sold_out=False)
        jewelries = super().get_queryset().filter(self.query).distinct('pk')

        metals = self.define_related_metal_objects(jewelries)
        stone_types = self.define_related_stone_type_objects(jewelries)

        self.jewelries_count_by_price = self.define_jewelries_count_by_price(jewelries)
        self.jewelries_count_by_metal = self.define_jewelries_count_by_metal(jewelries, metals)
        self.jewelries_count_by_stone_type = self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        price_choices = self.define_price_choices(jewelries)
        metal_choices = self.define_metal_choices(metals)
        stone_type_choices = self.define_stone_type_choices(stone_types)

        self.selection_form = self.update_selection_form(self.selection_form, price_choices=price_choices,
                                                         metal_choices=metal_choices,
                                                         stone_type_choices=stone_type_choices)

        if self.selection_form.is_valid():

            selection_pattern_price = self.selection_form.cleaned_data['price_choices']

            if selection_pattern_price:
                self.query &= self.update_query_mixin(
                    selection_pattern_price=selection_pattern_price,
                )


            selection_pattern_metals = self.selection_form.cleaned_data['metal_choices']

            if selection_pattern_metals:
                self.query &= self.update_query_mixin(selection_pattern_metals=selection_pattern_metals,
                                                )

            selection_pattern_stone_types = self.selection_form.cleaned_data['stone_type_choices']

            if selection_pattern_stone_types:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_types=selection_pattern_stone_types)


            jewelries = jewelries.filter(self.query).distinct('pk')

            metals = self.define_related_metal_objects(jewelries)
            stone_types = self.define_related_stone_type_objects(jewelries)

            self.jewelries_count_by_price = self.define_jewelries_count_by_price(jewelries)
            self.jewelries_count_by_metal = self.define_jewelries_count_by_metal(jewelries, metals)
            self.jewelries_count_by_stone_type = self.define_jewelries_count_by_stone_type(jewelries,
                                                                                           stone_types)

            price_choices = self.define_price_choices(jewelries)
            metal_choices = self.define_metal_choices(metals)
            stone_type_choices = self.define_stone_type_choices(stone_types)

            self.selection_form = self.update_selection_form(self.selection_form, price_choices=price_choices,
                                                             metal_choices=metal_choices,
                                                             stone_type_choices=stone_type_choices)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['category_pk'] = self.kwargs['category_pk']
        context['form'] = self.selection_form
        # context['jewelries_count_by_category'] = self.jewelries_count_by_category
        context['jewelries_count_by_stone_type'] = self.jewelries_count_by_stone_type
        context['jewelries_count_by_metal'] = self.jewelries_count_by_metal
        # context['jewelries_count_by_stone_color'] = self.jewelries_count_by_stone_color
        context['jewelries_count_by_price'] = self.jewelries_count_by_price

        return context


class DisplayJewelriesView(NavigationBarMixin, ListView):
    model = Jewelry
    context_object_name = 'jewelries'
    paginate_by = 6
    choice_pk = None
    query = Q()
    jewelries_count_by_category = {}
    jewelries_count_by_metal = {}
    jewelries_count_by_stone_type = {}
    jewelries_count_by_stone_color = {}
    jewelries_count_by_price = {}
    selection_form = None

    def get_choice_id(self):
        if 'category_pk' in self.kwargs:
            category_pk = self.kwargs.get('category_pk')
            self.choice_pk = category_pk
            self.query = Q(category=category_pk, sold_out=False)

        elif 'metal_pk' in self.kwargs:
            metal_pk = self.kwargs.get('metal_pk')
            self.choice_pk = metal_pk
            self.query = Q(metals__exact=metal_pk, sold_out=False)

        elif 'stone_type_pk' in self.kwargs:
            stone_type_pk = self.kwargs.get('stone_type_pk')
            self.choice_pk = stone_type_pk
            self.query = Q(stone_types__exact=stone_type_pk, sold_out=False)

        elif 'stone_color_pk' in self.kwargs:
            stone_color_pk = self.kwargs.get('stone_color_pk')
            self.choice_pk = stone_color_pk
            self.query = Q(stone_colors__exact=stone_color_pk, sold_out=False)

    def get_queryset(self):
        self.get_choice_id()
        # jewelries = super().get_queryset()
        # jewelries = jewelries.filter(self.query).distinct('pk')
        # self.selection_form = self.get_selection_form(jewelries)
        # jewelries = jewelries.filter(self.query).distinct('pk')
        # self.selection_form = self.get_selection_form(jewelries)
        jewelries = super().get_queryset().filter(self.query).distinct('pk')
        self.selection_form = self.get_selection_form(jewelries)
        jewelries = jewelries.filter(self.query).distinct('pk')
        self.selection_form = self.get_selection_form(jewelries)

        return jewelries

    def get_selection_form(self, jewelries):
        self.selection_form = JewelryForm(self.request.GET)

        self.jewelries_count_by_price = define_jewelries_count_by_selected_price(jewelries)

        categories = get_related_category_objects(jewelries)
        self.jewelries_count_by_category = define_jewelries_count_by_selected_category(jewelries, categories)

        metals = get_related_metal_objects(jewelries)
        self.jewelries_count_by_metal = define_jewelries_count_by_selected_metal(jewelries, metals)

        stone_types = get_related_stone_type_objects(jewelries)
        self.jewelries_count_by_stone_type = define_jewelries_count_by_selected_stone_type(jewelries, stone_types)

        stone_colors = get_related_stone_color_objects(jewelries)
        self.jewelries_count_by_stone_color = define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)

        category_choices = get_related_choices(categories, field_name='title')
        metal_choices = get_related_choices(metals, field_name='title')
        stone_type_choices = get_related_choices(stone_types, field_name='title')
        stone_color_choices = get_related_choices(stone_colors, field_name='title')
        price_choices = show_available_prices(jewelries)

        update_selection_forms(
            self.selection_form,
            category_choices=category_choices,
            metal_choices=metal_choices,
            stone_type_choices=stone_type_choices,
            stone_color_choices=stone_color_choices,
            price_choices=price_choices,
        )

        if self.selection_form.is_valid():

            selection_pattern_price = self.selection_form.cleaned_data['price_choices']

            selection_pattern_category = self.selection_form.cleaned_data['category_choices']

            selection_pattern_metals = self.selection_form.cleaned_data['metal_choices']

            selection_pattern_stone_types = self.selection_form.cleaned_data['stone_type_choices']

            selection_pattern_stone_colors = self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_price:
                self.query &= Q(get_query_price(
                    selection_pattern_price
                )
                )

                self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
                    display_jewelries_after_selection(self.selection_form, jewelries)

            if selection_pattern_category:
                self.query &= Q(category_id__in=get_category_pks(
                    selection_pattern_category
                )
                )

                self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
                    display_jewelries_after_selection(self.selection_form, jewelries)

            if selection_pattern_metals:
                self.query &= Q(jewelry_metals__metal_id__in=get_metal_pks(
                    selection_pattern_metals
                )
                )

                self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
                    display_jewelries_after_selection(self.selection_form, jewelries)

            if selection_pattern_stone_types:
                self.query &= Q(jewelry_stones__stone_type_id__in=get_stone_type_pks(
                    selection_pattern_stone_types
                )
                )

                self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
                    display_jewelries_after_selection(self.selection_form, jewelries)

            if selection_pattern_stone_colors:
                self.query &= Q(
                    jewelry_stones__stone_color_id__in=get_stone_color_pks(
                        selection_pattern_stone_colors
                    )
                )

                self.jewelries_count_by_category, self.jewelries_count_by_metal, self.jewelries_count_by_stone_type, self.jewelries_count_by_stone_color, self.jewelries_count_by_price = \
                    display_jewelries_after_selection(self.selection_form, jewelries)

            return self.selection_form

    def get_template_names(self):
        if 'category_pk' in self.kwargs:
            return ['jewelry/display_jewelries_by_category.html']
        elif 'metal_pk' in self.kwargs:
            return ['jewelry/display_jewelries_by_metal.html']
        elif 'stone_type_pk' in self.kwargs:
            return ['jewelry/display_jewelries_by_stone_type.html']
        elif 'stone_color_pk' in self.kwargs:
            return 'jewelry/display_jewelries_by_stone_color.html'
        else:
            return super().get_template_names()

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        context['choice_pk'] = self.choice_pk
        context['form'] = self.selection_form
        context['jewelries_count_by_category'] = self.jewelries_count_by_category
        context['jewelries_count_by_stone_type'] = self.jewelries_count_by_stone_type
        context['jewelries_count_by_metal'] = self.jewelries_count_by_metal
        context['jewelries_count_by_stone_color'] = self.jewelries_count_by_stone_color
        context['jewelries_count_by_price'] = self.jewelries_count_by_price

        return context


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
