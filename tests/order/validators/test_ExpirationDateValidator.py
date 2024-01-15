from django.core.exceptions import ValidationError
from django.test import TestCase
from datetime import datetime, timedelta

from e_commerce_website.order.validators import ExpirationDateValidator


# replace 'yourapp' with the actual name of your Django app

class CardHasExpiredValidatorTest(TestCase):

    def test_valid_date(self):
        # Valid date should not raise any ValidationError
        validator = ExpirationDateValidator(error_message=('Card has expired', 'Invalid date format'))
        future_date = (datetime.now() + timedelta(days=365)).strftime('%m/%y')

        try:
            validator(future_date)
        except ValidationError:
            self.fail("Validation error raised for a valid date.")

    def test_expired_date(self):
        # Expired date should raise a ValidationError with the specified error message
        validator = ExpirationDateValidator(error_message=('Card has expired', 'Invalid date format'))
        past_date = (datetime.now() - timedelta(days=365)).strftime('%m/%y')

        with self.assertRaises(ValidationError) as context:
            validator(past_date)

        self.assertEqual(context.exception.message, 'Card has expired')
        self.assertEqual(context.exception.code, 'invalid')

    def test_invalid_date_format(self):
        # Invalid date format should raise a ValidationError with the specified error message
        validator = ExpirationDateValidator(error_message=('Card has expired', 'Invalid date format'))
        invalid_date = 'invalid_format'

        with self.assertRaises(ValidationError) as context:
            validator(invalid_date)

        self.assertEqual(context.exception.message, 'Invalid date format')
        self.assertEqual(context.exception.code, 'invalid_date_format')
