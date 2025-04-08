from e_commerce_website.profiles.models import AccountProfile
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model


class RegisterUserViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_user_registration_and_profile_creation(self):
        user_data = {
            'email': 'beatris@icloud.com',
            'password1': 'securepassword123',
            'password2': 'securepassword123',
            'consent': True
        }

        response = self.client.post(
            reverse('register_user'), data=user_data
        )

        self.assertRedirects(
            response, reverse('index_page')
        )

        self.assertTrue(
            get_user_model().objects.
            filter(email=user_data['email']).exists()
        )

        self.assertTrue(
            response.wsgi_request.user.is_authenticated
        )

        user = get_user_model(). \
            objects.get(email=user_data['email'])

        self.assertTrue(
            AccountProfile.objects.
            filter(user=user).exists()
        )
