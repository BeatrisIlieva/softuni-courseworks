from django import template

register = template.Library()


@register.filter
def concat_strings(value, arg):
    return f'{value} {arg}'
