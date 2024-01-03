from django.db.models import Q

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
    def define_related_stone_type_objects(jewelries):
        stone_types = get_related_stone_type_objects(jewelries)

        return stone_types

    @staticmethod
    def define_related_stone_color_objects(jewelries):
        stone_colors = get_related_stone_color_objects(jewelries)

        return stone_colors


class DefineCountsMixin:
    @staticmethod
    def define_jewelries_count_by_price(jewelries):
        jewelries_count_by_price = define_jewelries_count_by_selected_price(jewelries)
        return jewelries_count_by_price

    @staticmethod
    def define_jewelries_count_by_category(jewelries, categories):
        jewelries_count_by_category = define_jewelries_count_by_selected_category(jewelries, categories)
        return jewelries_count_by_category

    @staticmethod
    def define_jewelries_count_by_metal(jewelries, metals):
        jewelries_count_by_metal = define_jewelries_count_by_selected_metal(jewelries, metals)
        return jewelries_count_by_metal

    @staticmethod
    def define_jewelries_count_by_stone_type(jewelries, stone_types):
        jewelries_count_by_stone_type = define_jewelries_count_by_selected_stone_type(jewelries, stone_types)
        return jewelries_count_by_stone_type

    @staticmethod
    def define_jewelries_count_by_stone_color(jewelries, stone_colors):
        jewelries_count_by_stone_color = define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)
        return jewelries_count_by_stone_color


class DefineChoicesMixin:

    @staticmethod
    def define_price_choices(jewelries):
        price_choices = show_available_prices(jewelries)
        return price_choices

    @staticmethod
    def define_category_choices(categories):
        category_choices = get_related_choices(categories, field_name='title')
        return category_choices

    @staticmethod
    def define_metal_choices(metals):
        metal_choices = get_related_choices(metals, field_name='title')
        return metal_choices

    @staticmethod
    def define_stone_type_choices(stone_types):
        stone_type_choices = get_related_choices(stone_types, field_name='title')
        return stone_type_choices

    @staticmethod
    def define_stone_color_choices(stone_colors):
        stone_color_choices = get_related_choices(stone_colors, field_name='title')
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
            return Q(jewelry_metals__metal_id__in=get_metal_pks(
                selection_pattern_metals
            )
            )

        elif 'selection_pattern_price' in kwargs:
            selection_pattern_price = kwargs['selection_pattern_price']

            return Q(get_query_price(
                selection_pattern_price
            )
            )


        elif 'selection_pattern_category' in kwargs:
            selection_pattern_category = kwargs['selection_pattern_category']
            return Q(category_id__in=get_category_pks(
                selection_pattern_category
            )
            )


        elif 'selection_pattern_stone_types' in kwargs:
            selection_pattern_stone_types = kwargs['selection_pattern_stone_types']
            return Q(jewelry_stones__stone_type_id__in=get_stone_type_pks(
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
