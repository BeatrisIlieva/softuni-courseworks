from django import template

from frutipediaApp.core.utils import get_profile_object

register = template.Library()


@register.simple_tag
def has_profile():
    return get_profile_object()
