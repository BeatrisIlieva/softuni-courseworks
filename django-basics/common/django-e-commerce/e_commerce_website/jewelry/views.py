from django.db.models import Q
from django.shortcuts import redirect
from django.views.generic import TemplateView
from django.views.generic.edit import FormMixin
from e_commerce_website.jewelry.mixins import (
    DisplayJewelryMixin, LastViewedJewelriesMixin,
    JewelryStonesMixin, JewelryMetalsMixin, JewelriesStonesMixin, JewelriesMetalsMixin
)
from e_commerce_website.jewelry.models import (
    Jewelry, StoneType, StoneColor
)
from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.jewelry.forms import (
    JewelryCategoryForm, JewelryMetalForm,
    JewelryStoneTypeForm, JewelryStoneColorForm, SizeForm
)
from e_commerce_website.jewelry.funcs import (
    get_related_size_objects, get_related_choices,
    get_stone_type_pks, get_stone_color_pks
)


class DisplayJewelriesByCategoryView(DisplayJewelryMixin, JewelriesStonesMixin, JewelriesMetalsMixin):
    template_name = 'jewelry/display-jewelries-by-category.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.jewelries_count_by_metal = {}
        self.jewelries_count_by_stone_type = {}
        self.jewelries_count_by_stone_color = {}
        self.jewelries_by_metals = {}
        self.jewelries_by_stones = {}
        self.jewelries_by_price = {}
        self.selection_form = JewelryCategoryForm

    def get_queryset(self):
        self.selection_form = self.selection_form(self.request.GET)

        selected_pk = self.kwargs['selected_pk']

        stone_color_pk = None
        stone_type_pk = None

        self.query &= Q(
            category=selected_pk,
            inventory__quantity__gt=0

        )

        jewelries = super().get_queryset(). \
            filter(self.query). \
            distinct('pk')

        self.update_related_objects(
            jewelries,
            stone_type_pk,
            stone_color_pk
        )

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

                stone_type_pk = get_stone_type_pks(
                    selection_pattern_stone_types
                )

                stone_color_pk = self.define_related_stone_color_objects(
                    jewelries,
                    stone_type_pk
                )

            selection_pattern_stone_colors = \
                self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_stone_colors:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_colors=selection_pattern_stone_colors
                )

                stone_color_pk = get_stone_color_pks(
                    selection_pattern_stone_colors
                )

                stone_type_pk = self.define_related_stone_type_objects(
                    jewelries,
                    stone_color_pk
                )

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(
                jewelries,
                stone_type_pk,
                stone_color_pk
            )

        self.set_liked_jewelries(self.request, jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()

        context['form'] = self.selection_form

        context['selected_pk'] = \
            self.kwargs['selected_pk']

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_stone_color'] = \
            self.jewelries_count_by_stone_color

        context['jewelries_count_by_metal'] = \
            self.jewelries_count_by_metal

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        context['jewelries_by_metals'] = \
            self.jewelries_by_metals

        context['jewelries_by_stones'] = \
            self.jewelries_by_stones

        return context

    def update_related_objects(
            self,
            jewelries,
            stone_type_pk,
            stone_color_pk
    ):

        metals = \
            self.define_related_metal_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(jewelries, stone_color_pk)

        stone_colors = \
            self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_metal = \
            self.define_jewelries_count_by_metal(jewelries, metals)

        if stone_type_pk is not None:
            stone_types = StoneType.objects.filter(id__in=stone_type_pk)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        if stone_color_pk is not None:
            stone_colors = StoneColor.objects.\
                filter(id__in=stone_color_pk)

        self.jewelries_count_by_stone_color = \
            self.define_jewelries_count_by_stone_color(jewelries, stone_colors)

        price_choices = \
            self.define_price_choices(jewelries)

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

        self.jewelries_by_metals = self.get_jewelries_metals(jewelries)
        self.jewelries_by_stones = self.get_jewelries_stones(jewelries)


class DisplayJewelriesByMetalView(DisplayJewelryMixin):
    template_name = 'jewelry/display-jewelries-by-metal.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.jewelries_count_by_category = {}
        self.jewelries_count_by_stone_type = {}
        self.jewelries_count_by_stone_color = {}
        self.selection_form = JewelryMetalForm

    def get_queryset(self):
        self.selection_form = \
            self.selection_form(self.request.GET)

        selected_pk = self.kwargs['selected_pk']

        stone_type_pk = None
        stone_color_pk = None

        self.query &= Q(
            metals__exact=selected_pk,
            inventory__quantity__gt=0
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        self.update_related_objects(
            jewelries,
            stone_type_pk,
            stone_color_pk
        )

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

                stone_type_pk = get_stone_type_pks(
                    selection_pattern_stone_types
                )

                stone_color_pk = self.define_related_stone_color_objects(
                    jewelries,
                    stone_type_pk
                )

            selection_pattern_stone_colors = \
                self.selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_stone_colors:
                self.query &= self.update_query_mixin(
                    selection_pattern_stone_colors=selection_pattern_stone_colors
                )

                stone_color_pk = get_stone_color_pks(
                    selection_pattern_stone_colors
                )

                stone_type_pk = self.define_related_stone_type_objects(
                    jewelries,
                    stone_color_pk
                )

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(
                jewelries,
                stone_type_pk,
                stone_color_pk
            )

        self.set_liked_jewelries(self.request, jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()

        context['form'] = self.selection_form

        context['selected_pk'] = \
            self.kwargs['selected_pk']

        context['jewelries_count_by_stone_type'] = \
            self.jewelries_count_by_stone_type

        context['jewelries_count_by_stone_color'] = \
            self.jewelries_count_by_stone_color

        context['jewelries_count_by_category'] = \
            self.jewelries_count_by_category

        context['jewelries_count_by_price'] = \
            self.jewelries_count_by_price

        return context

    def update_related_objects(
            self,
            jewelries,
            stone_type_pk,
            stone_color_pk
    ):
        categories = \
            self.define_related_category_objects(jewelries)

        stone_types = \
            self.define_related_stone_type_objects(
                jewelries,
                stone_color_pk
            )

        stone_colors = \
            self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.jewelries_count_by_price = \
            self.define_jewelries_count_by_price(jewelries)

        self.jewelries_count_by_category = \
            self.define_jewelries_count_by_category(jewelries, categories)

        if stone_type_pk is not None:
            stone_types = StoneType.objects.\
                filter(id__in=stone_type_pk)

        self.jewelries_count_by_stone_type = \
            self.define_jewelries_count_by_stone_type(jewelries, stone_types)

        if stone_color_pk is not None:
            stone_colors = StoneColor.objects.\
                filter(id__in=stone_color_pk)

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
    template_name = 'jewelry/display-jewelries-by-stone-type.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.jewelries_count_by_metal = {}
        self.jewelries_count_by_category = {}
        self.jewelries_count_by_stone_type = {}
        self.jewelries_count_by_stone_color = {}
        self.selection_form = JewelryStoneTypeForm

    def get_queryset(self):
        self.selection_form = \
            self.selection_form(self.request.GET)

        selected_pk = self.kwargs['selected_pk']
        stone_type_pk = [selected_pk]

        self.query &= Q(
            stone_types__exact=selected_pk,
            inventory__quantity__gt=0
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        stone_color_pk = \
            self.define_related_stone_color_objects(jewelries, stone_type_pk)

        self.update_related_objects(
            jewelries,
            stone_type_pk,
            stone_color_pk
        )

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
                stone_color_pk = get_stone_color_pks(
                    selection_pattern_stone_colors
                )

                stone_type_pk = self.define_related_stone_type_objects(
                    jewelries,
                    stone_color_pk
                )

            jewelries = jewelries. \
                filter(self.query). \
                distinct('pk')

            self.update_related_objects(
                jewelries,
                stone_type_pk,
                stone_color_pk
            )

        self.set_liked_jewelries(self.request, jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()

        context['form'] = self.selection_form

        context['selected_pk'] = \
            self.kwargs['selected_pk']

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
    template_name = 'jewelry/display-jewelries-by-stone-color.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.jewelries_count_by_metal = {}
        self.jewelries_count_by_category = {}
        self.jewelries_count_by_stone_type = {}
        self.jewelries_count_by_stone_color = {}

    def get_queryset(self):
        self.selection_form = \
            JewelryStoneColorForm(self.request.GET)

        selected_pk = self.kwargs['selected_pk']
        stone_color_pk = [selected_pk]

        self.query &= Q(
            stone_colors__exact=selected_pk,
            inventory__quantity__gt=0
        )

        jewelries = \
            super(). \
                get_queryset(). \
                filter(self.query). \
                distinct('pk')

        stone_type_pk = \
            self.define_related_stone_type_objects(jewelries, stone_color_pk)

        self.update_related_objects(
            jewelries,
            stone_color_pk,
            stone_type_pk
        )

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

        self.set_liked_jewelries(self.request, jewelries)

        return jewelries

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()

        context['form'] = self.selection_form

        context['selected_pk'] = \
            self.kwargs['selected_pk']

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


class JewelryDetailsView(
    LastViewedJewelriesMixin,
    NavigationBarMixin,
    JewelryStonesMixin,
    JewelryMetalsMixin,
    TemplateView,
    FormMixin
):

    template_name = 'jewelry/jewelry-details.html'
    form_class = SizeForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pk = self.kwargs['pk']
        jewelry = Jewelry.objects.get(pk=pk)

        selection_form = self.get_form()

        sizes = get_related_size_objects(jewelry)
        size_choices = get_related_choices(
            sizes,
            field_name='measurement'
        )

        selection_form.fields['sizes'].choices = size_choices

        context['form'] = selection_form

        context['stone_info_dict'] = self.get_jewelry_stones(jewelry)

        context['metal_info_dict'] = self.get_jewelry_metals(jewelry)

        context['jewelry'] = jewelry

        request_session = self.request.session

        last_viewed_jewelries = self.get_last_viewed_jewelries(request_session)

        context.update(last_viewed_jewelries)

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context

    def post(self, request, *args, **kwargs):
        selection_form = self.get_form()

        if selection_form.is_valid():

            selected_size = selection_form.cleaned_data['sizes']

            jewelry_by_size = request.session.get('jewelry_by_size', {})

            jewelry_pk = str(self.kwargs['pk'])

            jewelry_by_size[jewelry_pk] = selected_size

            request.session['jewelry_by_size'] = jewelry_by_size

            return redirect('add_to_shopping_cart', pk=self.kwargs['pk'])

        else:
            context = self.get_context_data()

            return self.render_to_response(context)
