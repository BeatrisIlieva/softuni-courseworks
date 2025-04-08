from django import template

register = template.Library()

@register.filter(name='get_value_from_dict')
def get_value_from_dict(dictionary, key):
    return dictionary.get(key)

@register.filter(name='sort_dict_by_value')
def sort_dict_by_value(dictionary):
    sorted_items = sorted(dictionary.items(), key=lambda x: x[1], reverse=True)
    return sorted_items




