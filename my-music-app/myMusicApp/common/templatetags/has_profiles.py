from django import template

from myMusicApp.common.utils import is_user_authenticated

register = template.Library()

@register.simple_tag
def has_profiles():
    return is_user_authenticated()

    