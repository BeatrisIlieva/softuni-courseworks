from django.test import TestCase

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.profiles.models import AccountProfile


class FirstNameTests(TestCase):
    def setUp(self):
        self.user = AccountUser.objects.create(email='beatrisilieve@icloud.com')

        self.valid_account_profile_data = {
            'first_name': 'Beatris',
            'last_name': 'Ilieve',
            'phone_number': '0000000000',
            'country': 'BG',
            'city': 'Sofia',
            'delivery_address': 'Some Address',
            'user': self.user

        }
    def test_create__when_first_name_contains_only_letters__expect_to_be_created(self):
        account_profile = AccountProfile.objects.create(**self.valid_account_profile_data)
        self.assertIsNotNone(account_profile.pk)

    def test_create__when_first_name_does_not_contain_only_letters__expect_to_raise(self):
        pass

