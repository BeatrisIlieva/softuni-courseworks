# class DisplayJewelryMixin(
#     DefineRelatedObjectsMixin,
#     UpdateQueryMixin,
#     # SetSelectionFormMixin,
#     # UpdateSelectionFormMixin,
#     # DefineChoicesMixin,
#     # DefineCountsMixin,
#     NavigationBarMixin,
#     ListView,
#     # GetUpdatedFormChoicesMixin,
#     # GetUpdatedFormCountersMixin,
#     GetStoneSelectionMixin,
#     AddToQueryMixin,
#     UpdateQueryMixin,
#     SetSelectionFormMixin,
# ):
#     model = Jewelry
#     template_name = None
#     paginate_by = 6
#     query = Q()
#     choice_pk = None
#     selection_form = None
#     jewelries_count_by_price = {}
#     jewelries_count_by_metal = {}
#     jewelries_count_by_category = {}
#     jewelries_count_by_stone_type = {}
#     jewelries_count_by_stone_color = {}
#
#     def get_queryset(self):
#         self.selection_form = \
#             JewelryCategoryForm(self.request.GET)
#
#         choice_pk = self.kwargs['choice_pk']
#
#         self.query &= Q(
#             category=choice_pk,
#             sold_out=False
#         )
#
#         queryset = super().get_queryset(). \
#             filter(self.query). \
#             distinct('pk')
#
#         return queryset
#
#     def get_context_data(self, *args, **kwargs):
#         context = super().get_context_data(*args, **kwargs)
#
#         nav_bar_context = self.get_nav_bar_context()
#         context.update(nav_bar_context)
#
#         context['form'] = self.selection_form
#
#         form_data = self.request.GET.copy() if self.request.GET else {}
#         form_data.pop('page', None)
#         page_number = self.request.GET.get('page', 1)
#         form_data_encoded = urlencode(form_data) + '&' if form_data else ''
#         context['form_data_encoded'] = form_data_encoded
#         context['page_number'] = page_number
#
#         return context
#
#