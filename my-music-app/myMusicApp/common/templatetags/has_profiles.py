from django import template

from myMusicApp.core.utils import get_profile_object

register = template.Library()

@register.simple_tag
def has_profiles():
    return get_profile_object()

    