# from collections import OrderedDict
#
# from e_commerce_website.jewelry.common_funcs import get_objects_ids
# from e_commerce_website.jewelry.models import Category
#
#
# def get_related_category_objects(jewelries):
#     jewelry_ids = get_objects_ids(jewelries)
#
#     categories = Category.objects. \
#         prefetch_related('jewelry_category'). \
#         filter(jewelry_category__in=jewelries)
#
#     return categories
#
#
# def get_related_category_choices(categories):
#     category_choices = list(OrderedDict(
#         (category.title, category.get_title_display())
#         for category in categories
#     ).items())
#
#     return category_choices
#
#
# def get_category_ids(selection_pattern_categories):
#     category_titles = Category.objects. \
#         filter(title__in=selection_pattern_categories)
#
#     category_ids = get_objects_ids(category_titles)
#
#     return category_ids
