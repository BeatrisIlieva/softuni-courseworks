from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q
from django.views.generic import DetailView, ListView

from e_commerce_website.common.mixins import NavigationBarMixin

from e_commerce_website.jewelry.forms import JewelryForm, JewelryDetailsForm
from e_commerce_website.jewelry.funcs import define_jewelries_count_by_selected_price, get_related_category_objects, \
    define_jewelries_count_by_selected_category, get_related_metal_objects, \
    define_jewelries_count_by_selected_metal, get_related_stone_type_objects, \
    define_jewelries_count_by_selected_stone_type, get_related_stone_color_objects, \
    define_jewelries_count_by_selected_stone_color, get_related_category_choices, get_related_metal_choices, \
    get_related_stone_type_choices, get_related_stone_color_choices, show_available_prices, update_selection_forms, \
    get_query_price, display_jewelries_after_selection, get_category_pks, get_metal_pks, get_stone_type_pks, \
    get_stone_color_pks, get_related_size_objects, get_related_size_choices

from e_commerce_website.jewelry.models import Jewelry


class DisplayJewelriesView(NavigationBarMixin, ListView):
    model = Jewelry
    context_object_name = 'jewelries'
    paginate_by = 6
    choice_pk = None

    def get_queryset(self):
        jewelries = super().get_queryset()

        query = Q()

        if 'category_pk' in self.kwargs:
            category_pk = self.kwargs.get('category_pk')
            self.choice_pk = category_pk
            query |= Q(category=category_pk, sold_out=False)

        elif 'metal_pk' in self.kwargs:
            metal_pk = self.kwargs.get('metal_pk')
            self.choice_pk = metal_pk
            query |= Q(metals__exact=metal_pk, sold_out=False)

        elif 'stone_type_pk' in self.kwargs:
            stone_type_pk = self.kwargs.get('stone_type_pk')
            self.choice_pk = stone_type_pk
            query |= Q(stone_types__exact=stone_type_pk, sold_out=False)

        elif 'stone_color_pk' in self.kwargs:
            stone_color_pk = self.kwargs.get('stone_color_pk')
            self.choice_pk = stone_color_pk
            query |= Q(stone_colors__exact=stone_color_pk, sold_out=False)

        jewelries = jewelries.filter(
            query
        ).distinct('pk')

        return jewelries

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
        jewelries = self.get_queryset()

        selection_form = JewelryForm(self.request.GET)

        jewelries_count_by_price = define_jewelries_count_by_selected_price(jewelries)

        categories = get_related_category_objects(jewelries)
        jewelries_count_by_category = define_jewelries_count_by_selected_category(jewelries, categories)

        metals = get_related_metal_objects(jewelries)
        jewelries_count_by_metal = define_jewelries_count_by_selected_metal(jewelries, metals)

        stone_types = get_related_stone_type_objects(jewelries)
        jewelries_count_by_stone_type = define_jewelries_count_by_selected_stone_type(jewelries, stone_types)

        stone_colors = get_related_stone_color_objects(jewelries)
        jewelries_count_by_stone_color = define_jewelries_count_by_selected_stone_color(jewelries, stone_colors)

        category_choices = get_related_category_choices(categories)
        metal_choices = get_related_metal_choices(metals)
        stone_type_choices = get_related_stone_type_choices(stone_types)
        stone_color_choices = get_related_stone_color_choices(stone_colors)
        price_choices = show_available_prices(jewelries)

        update_selection_forms(
            selection_form,
            category_choices=category_choices,
            metal_choices=metal_choices,
            stone_type_choices=stone_type_choices,
            stone_color_choices=stone_color_choices,
            price_choices=price_choices,
        )

        if selection_form.is_valid():

            selection_pattern_price = selection_form.cleaned_data['order_by_price']

            selection_pattern_category = selection_form.cleaned_data['category_choices']

            selection_pattern_metals = selection_form.cleaned_data['metal_choices']

            selection_pattern_stone_types = selection_form.cleaned_data['stone_type_choices']

            selection_pattern_stone_colors = selection_form.cleaned_data['stone_color_choices']

            if selection_pattern_price:
                jewelries = jewelries.filter(
                    get_query_price(
                        selection_pattern_price
                    )
                )

                jewelries_count_by_category, jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                    display_jewelries_after_selection(selection_form, jewelries)

            if selection_pattern_category:
                jewelries = jewelries.filter(
                    category_id__in=get_category_pks(
                        selection_pattern_category
                    )
                )

                jewelries_count_by_category, jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                    display_jewelries_after_selection(selection_form, jewelries)

            if selection_pattern_metals:
                jewelries = jewelries.filter(
                    jewelry_metals__metal_id__in=get_metal_pks(
                        selection_pattern_metals
                    )
                )

                jewelries_count_by_category, jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                    display_jewelries_after_selection(selection_form, jewelries)

            if selection_pattern_stone_types:
                jewelries = jewelries.filter(
                    jewelry_stones__stone_type_id__in=get_stone_type_pks(
                        selection_pattern_stone_types
                    )
                )

                jewelries_count_by_category, jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                    display_jewelries_after_selection(selection_form, jewelries)

            if selection_pattern_stone_colors:
                jewelries = jewelries.filter(
                    jewelry_stones__stone_color_id__in=get_stone_color_pks(
                        selection_pattern_stone_colors
                    )
                )

                jewelries_count_by_category, jewelries_count_by_metal, jewelries_count_by_stone_type, jewelries_count_by_stone_color, jewelries_count_by_price = \
                    display_jewelries_after_selection(selection_form, jewelries)

            paginator = Paginator(jewelries, self.paginate_by)
            page = self.request.GET.get('page')

            try:
                jewelries_paginated = paginator.page(page)
            except PageNotAnInteger:

                jewelries_paginated = paginator.page(1)
            except EmptyPage:

                jewelries_paginated = paginator.page(paginator.num_pages)

            nav_bar_context = self.get_nav_bar_context()
            context.update(nav_bar_context)

            context['jewelries'] = jewelries_paginated
            context['paginator'] = paginator
            context['choice_pk'] = self.choice_pk
            context['form'] = selection_form
            context['jewelries_count_by_category'] = jewelries_count_by_category
            context['jewelries_count_by_stone_type'] = jewelries_count_by_stone_type
            context['jewelries_count_by_metal'] = jewelries_count_by_metal
            context['jewelries_count_by_stone_color'] = jewelries_count_by_stone_color
            context['jewelries_count_by_price'] = jewelries_count_by_price

            return context


class JewelryDetailsView(NavigationBarMixin, DetailView):
    model = Jewelry
    template_name = 'jewelry/jewelry_details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        selection_form = JewelryDetailsForm(self.request.GET)
        sizes = get_related_size_objects(self.get_object())
        size_choices = get_related_size_choices(sizes)
        if selection_form.is_valid():
            selection_form.fields['sizes'].choices = size_choices

        context['form'] = selection_form

        nav_bar_context = self.get_nav_bar_context()
        context.update(nav_bar_context)

        return context
