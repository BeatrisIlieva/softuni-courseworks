from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

UserModel = get_user_model()
class LoginUserViewTests(TestCase):
    def setUp(self) -> None:
        self.user_data = {
            'email': 'beatris@icloud.com',
            'password': '!@123Qw'
        }
    def test_login_user(self):
        UserModel.objects.create_user(
            **self.user_data
        )
        self.client.login(**self.user_data)

        response = self.client.get(reverse('index_page'))