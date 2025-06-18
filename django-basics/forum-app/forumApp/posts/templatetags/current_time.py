from django import template
from datetime import datetime


register = template.Library()

@register.simple_tag(name='current_time', takes_context=True)
def current_time(context, format_string='%Y-%m-%d %H:%M:%S'):
    print(context)
    return datetime.now().strftime(format_string)