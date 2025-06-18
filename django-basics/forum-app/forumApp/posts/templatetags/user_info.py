from django import template

register = template.Library()

@register.inclusion_tag('user_info.html', takes_context=True) 
def user_info(context, user):
    # if context.request.user.is_authenticated:
    #     return {
    #         'username': context.request.user.username
    #     }

    # return {
    #     'username': 'anonymous'
    # }

    
    if user.is_authenticated:
        return {
            'username': user.username
        }
        
    return {
        'username': 'Anonymous'
    }