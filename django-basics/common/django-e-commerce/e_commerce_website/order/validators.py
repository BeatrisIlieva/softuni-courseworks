from datetime import datetime
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class ExpirationDateValidator:
    EXPIRATION_DATE_FORMAT = '%m/%y'

    def __init__(self, error_message):
        self.error_message = error_message

    def __call__(self, value):
        try:
            expiration_date = datetime.strptime(
                value, self.EXPIRATION_DATE_FORMAT
            )

            if expiration_date < datetime.now():
                raise ValidationError(
                    message=self.error_message[0],
                    code='invalid',
                )

        except ValueError:
            raise ValidationError(
                self.error_message[1],
                code='invalid_date_format'
            )
