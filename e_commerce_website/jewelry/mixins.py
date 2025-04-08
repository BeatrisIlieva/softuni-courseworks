from _decimal import Decimal

from django.db.models import Q
from django.views.generic import ListView

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import Jewelry, Category, Metal, JewelryStone, StoneType, StoneColor
from e_commerce_website.common.mixins import NavigationBarMixin
from collections import OrderedDict

from e_commerce_website.jewelry.funcs import \
    get_related_choices, \
    get_query_price, \
    get_category_pks, \
    get_metal_pks, \
    get_stone_type_pks, \
    get_stone_color_pks


class DefineRelatedObjectsMixin:
    @staticmethod
    def define_related_category_objects(jewelries):
        categories = Category.objects. \
            prefetch_related('jewelry_category'). \
            filter(jewelry_category__in=jewelries)

        return categories

    @staticmethod
    def define_related_metal_objects(jewelries):
        metals = Metal.objects. \
            prefetch_related('metals'). \
            filter(jewelry__in=jewelries)

        return metals

    @staticmethod
    def define_related_stone_type_objects(jewelries, stone_color_pk):
        if stone_color_pk is not None:
            stone_types_pks = JewelryStone.objects. \
                filter(jewelry__in=jewelries, stone_color__in=stone_color_pk). \
                values_list('stone_type_id', flat=True)

            return stone_types_pks

        stone_types = StoneType.objects. \
            prefetch_related('stone_types'). \
            filter(jewelry__in=jewelries)

        return stone_types

    @staticmethod
    def define_related_stone_color_objects(jewelries, stone_type_pk):
        if stone_type_pk is not None:
            stone_colors_pks = JewelryStone.objects. \
                filter(jewelry__in=jewelries, stone_type__in=stone_type_pk).values_list('stone_color_id', flat=True)

            return stone_colors_pks

        stone_colors = StoneColor.objects. \
            prefetch_related('stone_colors'). \
            filter(jewelry__in=jewelries)

        return stone_colors


class DefineCountsMixin:
    @staticmethod
    def define_jewelries_count_by_price(jewelries):
        jewelries_count_by_price = {}
        all_price_choices = Inventory.PriceChoices.choices

        for value, display in all_price_choices:
            min_price, max_price = float(
                value.split(',')[0]), \
                float(value.split(',')[1]
                      )

            decimal_min_price, decimal_max_price = (
                Decimal(min_price),
                Decimal(max_price)
            )

            count = jewelries.filter(
                Q(inventory__price__gte=decimal_min_price) &
                Q(inventory__price__lte=decimal_max_price)
            ).count()

            if display not in jewelries_count_by_price.keys():
                jewelries_count_by_price[display] = count

            else:
                jewelries_count_by_price[display] += count

        return jewelries_count_by_price

    @staticmethod
    def define_jewelries_count_by_category(jewelries, categories):
        jewelries_count_by_category = {}
        for category in categories:
            jewelries_count_by_category[category.get_title_display()] = jewelries. \
                select_related('category'). \
                filter(category_id=category.pk). \
                count()

        return jewelries_count_by_category

    @staticmethod
    def define_jewelries_count_by_metal(jewelries, metals):
        jewelries_count_by_metal = {}
        for metal in metals:
            jewelries_count_by_metal[metal.get_title_display()] = jewelries. \
                prefetch_related('jewelry_metals__metal'). \
                filter(jewelry_metals__metal_id=metal.pk). \
                count()

        return jewelries_count_by_metal

    @staticmethod
    def define_jewelries_count_by_stone_type(jewelries, stone_types):
        jewelries_count_by_stone_type = {}

        if isinstance(stone_types, int):

            count = JewelryStone.objects. \
                filter(jewelry__in=jewelries, stone_type__exact=stone_types). \
                count()

            stone_type = StoneType.objects. \
                get(id=stone_types)

            jewelries_count_by_stone_type[stone_type.get_title_display()] = count

        else:

            for stone_type in stone_types:
                jewelries_count_by_stone_type[stone_type.get_title_display()] = jewelries. \
                    prefetch_related('jewelry_stones__stone_type'). \
                    filter(jewelry_stones__stone_type_id__exact=stone_type.pk). \
                    count()

        return jewelries_count_by_stone_type

    @staticmethod
    def define_jewelries_count_by_stone_color(jewelries, stone_colors):
        jewelries_count_by_stone_color = {}

        if isinstance(stone_colors, int):

            count = JewelryStone.objects. \
                filter(jewelry__in=jewelries, stone_color__exact=stone_colors). \
                count()

            stone_color = StoneColor.objects. \
                get(id=stone_colors)

            jewelries_count_by_stone_color[stone_color.get_title_display()] = count

        else:

            for color in stone_colors:
                jewelries_count_by_stone_color[color.get_title_display()] = jewelries. \
                    prefetch_related('jewelry_stones__stone_color'). \
                    filter(jewelry_stones__stone_color_id__exact=color.pk). \
                    count()

        return jewelries_count_by_stone_color


class DefineChoicesMixin:

    @staticmethod
    def define_price_choices(jewelries):
        all_price_choices = Inventory.PriceChoices.choices
        prices = Inventory.objects.filter(jewelry__in=jewelries).values_list('price', flat=True). \
            order_by('price')

        prices_choices = []

        for price in prices:
            for value, display in all_price_choices:
                if price <= float(value.split(',')[1]):
                    prices_choices.append((value, display))
                    break

        ordered_price_choices = list(
            OrderedDict(prices_choices).items()
        )

        return ordered_price_choices

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


class LastViewedJewelriesMixin:
    @staticmethod
    def get_last_viewed_jewelries(request_session):
        last_viewed_jewelries = request_session.get('last_viewed_jewelries', [])
        last_viewed_jewelries = Jewelry.objects.filter(id__in=last_viewed_jewelries)

        context = {'last_viewed_jewelries': last_viewed_jewelries}
        return context


class JewelryIsLikedByUserMixin:
    @staticmethod
    def set_liked_jewelries(request, queryset):

        if request.user.pk:

            for jewelry in queryset:
                jewelry.liked_by_user = jewelry.jewelrylike_set.filter(user=request.user).exists()

        else:
            liked_jewelries = request.session.get('liked_jewelries', [])

            for jewelry in queryset:
                jewelry.liked_by_user = jewelry.pk in liked_jewelries

class JewelriesStonesMixin:
    @staticmethod
    def get_jewelries_stones(jewelries):
        stones_info_dict = {}

        for jewelry in jewelries:
            jewelry_stones = jewelry.jewelry_stones.all()

            for jewelry_stone in jewelry_stones:
                stone_color = jewelry_stone.stone_color.get_title_display()
                stone_type = jewelry_stone.stone_type.get_title_display()

                stones_info_dict[jewelry.pk] = {stone_color: stone_type}

        return stones_info_dict


class JewelriesMetalsMixin:
    @staticmethod
    def get_jewelries_metals(jewelries):
        metals_info_dict = {}
        for jewelry in jewelries:
            jewelry_metals = jewelry.jewelry_metals.all()

            for jewelry_metal in jewelry_metals:
                metal = jewelry_metal.metal.get_title_display()

                if jewelry_metal.gold_carat:
                    gold_carat = jewelry_metal.gold_carat.get_weight_display()
                    metals_info_dict[jewelry.pk] = {metal: gold_carat}

                else:
                    metals_info_dict[jewelry.pk] = {metal: None}

        return metals_info_dict



class DisplayJewelryMixin(
    JewelryIsLikedByUserMixin,
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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.query = Q()
        self.jewelries_count_by_price = {}

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context


class JewelryStonesMixin:
    @staticmethod
    def get_jewelry_stones(jewelry):
        jewelry_stones = jewelry.jewelry_stones.all()

        stone_info_dict = {}

        for jewelry_stone in jewelry_stones:
            stone_color = jewelry_stone.stone_color.get_title_display()
            stone_type = jewelry_stone.stone_type.get_title_display()

            stone_info_dict[stone_color] = stone_type

        return stone_info_dict


class JewelryMetalsMixin:
    @staticmethod
    def get_jewelry_metals(jewelry):
        jewelry_metals = jewelry.jewelry_metals.all()

        metal_info_dict = {}

        for jewelry_metal in jewelry_metals:
            metal = jewelry_metal.metal.get_title_display()
            if jewelry_metal.gold_carat:
                gold_carat = jewelry_metal.gold_carat.get_weight_display()
                metal_info_dict[metal] = gold_carat
            else:
                metal_info_dict[metal] = None

        return metal_info_dict

# class PaginatorMixin:
#     def get_pagination(self, request):
#         form_data = request.GET.copy() if request.GET else {}
#         form_data.pop('page', None)
#         page_number = request.GET.get('page', 1)
#         form_data_encoded = urlencode(form_data) + '&' if form_data else ''
#
#         return form_data_encoded, page_number

    # form_data_encoded, page_number = self.get_pagination(self.request)
    #
    # context['form_data_encoded'] = form_data_encoded
    # context['page_number'] = page_number
