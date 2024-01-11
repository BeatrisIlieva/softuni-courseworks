from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model

from e_commerce_website.accounts.models import AccountUser


class RegisterUserViewTestCase(TestCase):
    def test_register_user_view(self):
        AccountUser.objects.create(email='beatrisilieve@icloud.com')

        response = self.client.get(reverse('index_page'), )

        self.assertEqual(response.status_code, 200)

        self.assertTrue(get_user_model().objects.filter(email='beatrisilieve@icloud.com').exists())
