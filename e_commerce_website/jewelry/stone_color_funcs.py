# from collections import OrderedDict
#
# from e_commerce_website.jewelry.common_funcs import get_objects_ids
# from e_commerce_website.jewelry.models import StoneColor
#
#
# def get_related_stone_color_objects(jewelries):
#     jewelry_ids = get_objects_ids(jewelries)
#     stone_colors = StoneColor.objects. \
#         prefetch_related('stone_colors'). \
#         filter(jewelry__in=jewelries)
#
#     return stone_colors
#
#
# def get_related_stone_color_choices(stone_colors):
#     stone_color_choices = list(OrderedDict(
#         (color.title, color.get_title_display()) for color in stone_colors
#     ).items())
#
#     return stone_color_choices
#
#
# def get_stone_color_ids(selection_pattern_stone_colors):
#     stone_color_titles = StoneColor.objects. \
#         filter(title__in=selection_pattern_stone_colors)
#
#     stone_color_ids = get_objects_ids(stone_color_titles)
#
#     return stone_color_ids
