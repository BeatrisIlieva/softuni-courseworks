from django.utils.timezone import now

from django.core.exceptions import ValidationError


def validate_card_expiry_date(value):

    if value < now().date():
        raise ValidationError("This card has expired")
