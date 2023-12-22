from collections import OrderedDict

from e_commerce_website.jewelry.models import Size


def get_related_size_objects(jewelry):
    sizes = Size.objects \
        .prefetch_related('category__jewelry_category__size') \
        .filter(sizes__jewelry__exact=jewelry)

    return sizes


def get_related_size_choices(sizes):
    size_choices = list(OrderedDict(
        (size.measurement, size.get_measurement_display()) for size in sizes
    ).items())

    return size_choices
