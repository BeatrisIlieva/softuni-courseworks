from django import template


register = template.Library()


@register.filter
def format_trip(trip):
    return f'{trip.destination}: {trip.duration} day/s, started on: {trip.start_date}'
