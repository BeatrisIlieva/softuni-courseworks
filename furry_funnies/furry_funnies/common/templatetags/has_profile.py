from django import template

from furry_funnies.core.utils import get_profile_object

register = template.Library()


@register.simple_tag
def has_profile():
    return get_profile_object()
