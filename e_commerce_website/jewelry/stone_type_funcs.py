from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import StoneType


def get_related_stone_type_objects(jewelries):
    jewelry_ids = get_objects_ids(jewelries)

    stone_types = StoneType.objects. \
        prefetch_related('stone_types'). \
        filter(jewelry__in=jewelries)

    return stone_types


def get_related_stone_type_choices(stone_types):
    stone_type_choices = list(OrderedDict(
        (stone_type.title, stone_type.get_title_display()) for stone_type in stone_types
    ).items())

    return stone_type_choices


def get_stone_type_ids(selection_pattern_stone_types):
    stone_type_titles = StoneType.objects. \
        filter(title__in=selection_pattern_stone_types)

    stone_type_ids = get_objects_ids(stone_type_titles)

    return stone_type_ids
