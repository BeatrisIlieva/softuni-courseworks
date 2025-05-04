from django import template


register = template.Library()


@register.filter
def concat_strings(first_string, second_string):
    return f'{first_string} {second_string}'
