from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


def get_objects_by_choices(model_name):
    objects = model_name.objects.all()

    object_choices = [
        x[1] for x in model_name.TitleChoices.choices
    ]

    object_by_choices = {}

    index = 0

    for obj in objects:
        object_by_choices[obj] = object_choices[index]
        index += 1

    return object_by_choices


def get_object_pks(model_name, search):
    objects = model_name.objects.all()

    options = [
        (obj.title, obj.get_title_display())
        for obj in objects if
        search in obj.get_title_display().lower()
        or search in obj.get_title_display()
    ]

    valid_options = [o[0] for o in options]

    obj_titles = model_name.objects. \
        filter(title__in=valid_options)

    obj_ids = [o.pk for o in obj_titles]

    return obj_ids


@deconstructible  # in order to be used for models as well not only forms
class ValueInRangeValidator:
    def __init__(self, min_value, max_value):
        self.min_value = min_value
        self.max_value = max_value

    def __call__(self, value):
        if len(value) < self.min_value or len(value) > self.max_value:
            raise ValidationError(
                message=f'Value must be between {self.min_value} and {self.max_value}',
                code='invalid',
            )

    def __eq__(self, other):  # in order to be used for models as well not only forms
        return (
                isinstance(other, self.__class__)
                and self.min_value == len(other.min_value)
                and self.max_value == len(other.max_value)
        )
