from django.core.exceptions import ValidationError


def validate_name(value):
    for el in value:
        if not (el.isalpha() or el.isspace()):
            raise ValidationError("Name can only contain letters and spaces")
