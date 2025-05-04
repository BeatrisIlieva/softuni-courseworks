from django import template

register = template.Library()


@register.filter
def split_string_by_comma_and_space(value):
    return value.split(', ')
