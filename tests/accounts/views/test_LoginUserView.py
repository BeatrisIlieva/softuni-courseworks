from django.contrib.auth import get_user_model
from django.test import TestCase, Client
from django.urls import reverse

UserModel = get_user_model()


class LoginOrRegisterUserViewTests(TestCase):
    def setUp(self) -> None:
        self.client = Client()

        self.user_data = {
            'email': 'beatris@icloud.com',
            'password': 'securepassword123'
        }

    def test_login_or_register_user(self):
        UserModel.objects.create_user(
            **self.user_data
        )
        self.client.login(**self.user_data)

        self.client.get(reverse('index_page'))
