from django.contrib.auth import get_user_model
from django.test import TestCase, Client
from django.urls import reverse

UserModel = get_user_model()


class LogoutUserViewTests(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        self.user_data = {
            'email': 'beatris@icloud.com',
            'password': 'securepassword123'
        }

        UserModel.objects.create_user(
            **self.user_data
        )

        self.client.login(**self.user_data)

    def test_logout_user(self):
        self.assertTrue(
            self.client.session['_auth_user_id']
        )

        response = self.client.get(
            reverse('logout_user')
        )

        self.assertRedirects(
            response, reverse('login_or_register_user')
        )
