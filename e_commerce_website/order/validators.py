from datetime import datetime

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

EXPIRATION_DATE_FORMAT = '%m/%y'


def check_expiry_date(value):
    try:
        expiration_date = datetime.strptime(value, EXPIRATION_DATE_FORMAT)
        if expiration_date < datetime.now():
            raise ValidationError(_('This card has expired.'), code='card_expired')
    except ValueError:
        raise ValidationError(_('Invalid date format. Please use MM/YY format.'), code='invalid_date_format')
