from django.db.models import Q
from django.views.generic import ListView

from e_commerce_website.jewelry.models import Jewelry
from e_commerce_website.common.mixins import NavigationBarMixin

from e_commerce_website.jewelry.funcs import \
    define_jewelries_count_by_selected_price, \
    get_related_category_objects, \
    define_jewelries_count_by_selected_category, \
    get_related_metal_objects, \
    define_jewelries_count_by_selected_metal, \
    get_related_stone_type_objects, \
    define_jewelries_count_by_selected_stone_type, \
    get_related_stone_color_objects, \
    define_jewelries_count_by_selected_stone_color, \
    show_available_prices, \
    get_related_choices, \
    get_query_price, \
    get_category_pks, \
    get_metal_pks, \
    get_stone_type_pks, \
    get_stone_color_pks


class DefineRelatedObjectsMixin:
    @staticmethod
    def define_related_category_objects(jewelries):
        categories = get_related_category_objects(jewelries)

        return categories

    @staticmethod
    def define_related_metal_objects(jewelries):
        metals = get_related_metal_objects(jewelries)

        return metals

    @staticmethod
    def define_related_stone_type_objects(jewelries, stone_color_pk):
        stone_types = get_related_stone_type_objects(jewelries, stone_color_pk)

        return stone_types

    @staticmethod
    def define_related_stone_color_objects(jewelries, stone_type_pk):
        stone_colors = get_related_stone_color_objects(jewelries, stone_type_pk)

        return stone_colors


class DefineCountsMixin:
    @staticmethod
    def define_jewelries_count_by_price(jewelries):
        jewelries_count_by_price = \
            define_jewelries_count_by_selected_price(jewelries)

        return jewelries_count_by_price

    @staticmethod
    def define_jewelries_count_by_category(jewelries, categories):
        jewelries_count_by_category = \
            define_jewelries_count_by_selected_category(jewelries, categories)

        return jewelries_count_by_category

    @staticmethod
    def define_jewelries_count_by_metal(jewelries, metals):
        jewelries_count_by_metal = \
            define_jewelries_count_by_selected_metal(jewelries, metals)

        return jewelries_count_by_metal

    @staticmethod
    def define_jewelries_count_by_stone_type(jewelries, stone_types):
        jewelries_count_by_stone_type = \
            define_jewelries_count_by_selected_stone_type(jewelries, stone_types)

        return jewelries_count_by_stone_type

    @staticmethod
    def define_jewelries_count_by_stone_color(jewelries, stone_colors):
        jewelries_count_by_stone_color = \
            define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)

        return jewelries_count_by_stone_color


class DefineChoicesMixin:

    @staticmethod
    def define_price_choices(jewelries):
        price_choices = show_available_prices(jewelries)

        return price_choices

    @staticmethod
    def define_category_choices(categories):
        category_choices = \
            get_related_choices(categories, field_name='title')

        return category_choices

    @staticmethod
    def define_metal_choices(metals):
        metal_choices = \
            get_related_choices(metals, field_name='title')

        return metal_choices

    @staticmethod
    def define_stone_type_choices(stone_types):
        stone_type_choices = \
            get_related_choices(stone_types, field_name='title')

        return stone_type_choices

    @staticmethod
    def define_stone_color_choices(stone_colors):
        stone_color_choices = \
            get_related_choices(stone_colors, field_name='title')

        return stone_color_choices


class UpdateSelectionFormMixin:
    @staticmethod
    def update_selection_form(selection_form, **kwargs):
        if 'category_choices' in kwargs:
            selection_form.fields['category_choices']. \
                choices = kwargs['category_choices']

        if 'price_choices' in kwargs:
            selection_form.fields['price_choices']. \
                choices = kwargs['price_choices']

        if 'metal_choices' in kwargs:
            selection_form.fields['metal_choices']. \
                choices = kwargs['metal_choices']

        if 'stone_type_choices' in kwargs:
            selection_form.fields['stone_type_choices']. \
                choices = kwargs['stone_type_choices']

        if 'stone_color_choices' in kwargs:
            selection_form.fields['stone_color_choices']. \
                choices = kwargs['stone_color_choices']

        if 'size_choices' in kwargs:
            selection_form.fields['size_choices']. \
                choices = kwargs['size_choices']

        return selection_form


class UpdateQueryMixin:
    @staticmethod
    def update_query_mixin(**kwargs):

        if 'selection_pattern_metals' in kwargs:
            selection_pattern_metals = kwargs['selection_pattern_metals']

            return Q(
                jewelry_metals__metal_id__in=get_metal_pks(
                    selection_pattern_metals
                )
            )

        elif 'selection_pattern_price' in kwargs:
            selection_pattern_price = kwargs['selection_pattern_price']

            return Q(
                get_query_price(
                    selection_pattern_price
                )
            )

        elif 'selection_pattern_category' in kwargs:
            selection_pattern_category = kwargs['selection_pattern_category']

            return Q(
                category_id__in=get_category_pks(
                    selection_pattern_category
                )
            )

        elif 'selection_pattern_stone_types' in kwargs:
            selection_pattern_stone_types = kwargs['selection_pattern_stone_types']

            return Q(
                jewelry_stones__stone_type_id__in=get_stone_type_pks(
                    selection_pattern_stone_types
                )
            )

        elif 'selection_pattern_stone_colors' in kwargs:
            selection_pattern_stone_colors = kwargs['selection_pattern_stone_colors']

            return Q(
                jewelry_stones__stone_color_id__in=get_stone_color_pks(
                    selection_pattern_stone_colors
                )
            )


class DisplayJewelryMixin(
    DefineRelatedObjectsMixin,
    UpdateQueryMixin,
    UpdateSelectionFormMixin,
    DefineChoicesMixin,
    DefineCountsMixin,
    NavigationBarMixin,
    ListView
):
    model = Jewelry
    paginate_by = 6
    query = Q()
    choice_pk = None
    jewelries_count_by_price = {}
    jewelries_count_by_metal = {}
    jewelries_count_by_category = {}
    jewelries_count_by_stone_type = {}
    jewelries_count_by_stone_color = {}


# class DisplayJewelriesByCategoryView(DisplayJewelryMixin):
#     template_name = 'jewelry/display_jewelries_by_category.html'
#
#     def get_parent_queryset(self):
#         selected_stone_type_pk = None
#         selected_stone_color_pk = None
#
#         queryset = super().get_queryset()
#
#         self.update_related_objects(queryset, selected_stone_type_pk, selected_stone_color_pk)
#
#         self.selection_form = JewelryCategoryForm(self.request.GET)
#
#         if self.selection_form.is_valid():
#
#             selection_pattern_price = self.set_selection_pattern_price(self.selection_form)
#
#             if selection_pattern_price:
#                 query_price = self.add_price_filtration(self, selection_pattern_price)
#
#                 self.query &= query_price
#
#             selection_pattern_metal = self.set_selection_pattern_metal(self.selection_form)
#
#             if selection_pattern_metal:
#                 query_metal = self.add_metal_filtration(selection_pattern_metal)
#
#                 self.query &= query_metal
#
#             selection_pattern_stone_type = self.set_selection_pattern_stone_type(self.selection_form)
#
#             if selection_pattern_stone_type:
#                 query_stone_type = self.add_stone_type_filtration(selection_pattern_stone_type)
#
#                 self.query &= query_stone_type
#
#                 selected_stone_type_pk = self.get_selected_stone_type_pk(selection_pattern_stone_type)
#                 selected_stone_color_pk = self.get_related_stone_color_pk(queryset, selected_stone_type_pk)
#
#             selection_pattern_stone_color = self.set_selection_pattern_stone_color(self.selection_form)
#
#             if selection_pattern_stone_color:
#                 query_stone_color = self.add_stone_color_filtration(selection_pattern_stone_color)
#
#                 self.query &= query_stone_color
#
#                 selected_stone_color_pk = self.get_selected_stone_color_pk(selection_pattern_stone_color)
#                 selected_stone_type_pk = self.get_related_stone_type_pks(queryset, selected_stone_color_pk)
#
#             queryset = queryset. \
#                 filter(self.query). \
#                 distinct('pk')
#
#         price_choices = self.get_price_choices(queryset)
#         metals, metal_choices = self.get_metal_choices(queryset)
#         stone_types, stone_type_choices = self.get_stone_type_choices(queryset, selected_stone_type_pk, selected_stone_color_pk)
#         stone_colors, stone_color_choices = self.get_stone_color_choices(queryset, selected_stone_type_pk, selected_stone_color_pk)
#         self.jewelries_count_by_price = self.get_jewelries_count_by_price(self, queryset)
#         self.jewelries_count_by_metal = self.get_jewelries_count_by_metals(self, queryset, metals)
#         self.jewelries_count_by_stone_color = self.get_jewelries_count_by_stone_type(self, queryset, stone_types)
#         self.jewelries_count_by_stone_color = self.define_jewelries_count_by_stone_color(queryset, stone_colors)
#
#         self.selection_form = \
#             self.update_selection_form(
#                 self.selection_form,
#                 price_choices=price_choices,
#                 metal_choices=metal_choices,
#                 stone_type_choices=stone_type_choices,
#                 stone_color_choices=stone_color_choices,
#             )
#
#         return queryset
#
#     def get_parent_context_data(self):
#         context = super().get_context_data()
#
#         context['choice_pk'] = \
#             self.kwargs['choice_pk']
#
#         context['jewelries_count_by_stone_type'] = \
#             self.jewelries_count_by_stone_type
#
#         context['jewelries_count_by_stone_color'] = \
#             self.jewelries_count_by_stone_color
#
#         context['jewelries_count_by_metal'] = \
#             self.jewelries_count_by_metal
#
#         context['jewelries_count_by_price'] = \
#             self.jewelries_count_by_price
#
#         return context
