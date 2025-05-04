from django import template

register = template.Library()

@register.inclusion_tag('common/user-info.html') #takes_context=True
def user_info(user):
    # if context.request.user.is_authenticated:
    #     return {
    #         'username': context.request.user.username
    #     }
    
    if user.is_authenticated:
        return {
            'username': user.username
        }
        
    return {
        'username': 'Anonymous'
    }