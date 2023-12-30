from datetime import datetime

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def check_card_has_expired(expiration_date):
    current_date = datetime.now()
    expiration_date = datetime.strptime(expiration_date, '%m/%y')

    if expiration_date < current_date:
        raise ValidationError(
            _('This card has expired.'),
            code='card_expired'
        )
