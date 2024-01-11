from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from e_commerce_website.accounts.models import AccountUser
from e_commerce_website.profiles.models import AccountProfile


class RegisterUserViewTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            'email': 'beatrisilieve@icloud.com',
            # 'password': 'testpassword123',
        }

    def test_register_user_view__expect_to_be_registered(self):
        response = self.client.post(
            reverse('register_user'),
            data={
                'email': 'beatrisilieve@icloud.com'
            }
        )

        user = AccountUser.objects.get(
            email= 'beatrisilieve@icloud.com'
        )
        profile = AccountProfile.objects.get(pk=user.pk)

        self.assertIsNotNone(user)
        self.assertIsNotNone(profile)





    # def test_register_user_view(self):
    #     AccountUser.objects.create(
    #         email='beatrisilieve@icloud.com'
    #     )
    #
    #     response = self.client.get(
    #         reverse('index_page'),
    #     )
    #
    #     self.assertEqual(response.status_code, 200)
    #
    #     self.assertTrue(get_user_model().objects.
    #                     filter(email='beatrisilieve@icloud.com').exists()
    #                     )
