from collections import OrderedDict

from e_commerce_website.jewelry.common_funcs import get_objects_ids
from e_commerce_website.jewelry.models import Metal


def get_related_metal_objects(jewelries):
    jewelry_ids = get_objects_ids(jewelries)

    metals = Metal.objects. \
        prefetch_related('jewelrydetails_set__jewelry_metals__metal'). \
        filter(jewelrydetails__in=jewelry_ids)

    return metals


def get_related_metal_choices(metals):
    metal_choices = list(OrderedDict(
        (metal.title, metal.get_title_display())
        for metal in metals
    ).items())

    return metal_choices


def get_metal_ids(selection_pattern_metals):
    metal_titles = Metal.objects. \
        filter(title__in=selection_pattern_metals)

    metal_ids = get_objects_ids(metal_titles)

    return metal_ids
