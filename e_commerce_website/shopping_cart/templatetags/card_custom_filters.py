from django import template

register = template.Library()

@register.filter(name='format_card_number')
def format_card_number(card_number):
    formatted_number = ' '.join([card_number[i:i+4] for i in range(0, len(card_number), 4)])
    return formatted_number
