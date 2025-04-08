from django.core.exceptions import ValidationError
from django.test import TestCase

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.profiles.models import AccountProfile


class LastNameTests(TestCase):
    def setUp(self):
        self.user = AccountUser.objects.\
            create(email='beatris@icloud.com')

        self.valid_account_profile_data = {
            'first_name': 'Beatris',
            'last_name': 'Ilieve',
            'phone_number': '0000000000',
            'country': 'BG',
            'city': 'Sofia',
            'delivery_address': 'Some Address',
            'user': self.user

        }

        self.invalid_account_profile_data = {
            **self.valid_account_profile_data,
            'last_name': '3lieve'
        }

    def test_create__when_last_name_contains_only_letters__expect_to_be_created(self):
        account_profile = AccountProfile.objects.\
            create(**self.valid_account_profile_data)

        self.assertIsNotNone(account_profile.pk)

    def test_create__when_last_name_does_not_contain_only_letters__expect_to_raise(self):
        with self.assertRaises(ValidationError) as ve:
            AccountProfile.objects.create(
                **self.invalid_account_profile_data
            ).full_clean()

        error_messages = ve.exception.message_dict
        actual_error_message = error_messages.get('last_name')[0]

        self.assertEqual(
            AccountProfile.ONLY_LETTERS_EXCEPTION_MESSAGE,
            actual_error_message
        )
