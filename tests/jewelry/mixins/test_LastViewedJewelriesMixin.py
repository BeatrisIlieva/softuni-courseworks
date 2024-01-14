from django.test import Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.test import TestCase as TestCase
from e_commerce_website.jewelry.models import (
    Category, Jewelry,
)


class LastViewedJewelriesMixinTests(TestCase):
    def setUp(self):
        self.client = Client()

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

    def test_last_viewed_jewelries__expect_max_length_of_three(self):
        user_data = {
            'email': 'beatris@icloud.com',
            'password1': 'securepassword123',
            'password2': 'securepassword123',
            'consent': True
        }

        self.client.post(
            reverse('register_user'),
            data=user_data
        )

        self.user = get_user_model(). \
            objects.get(email=user_data['email'])

        initial_last_viewed_jewelries_count = \
            len(self.client.session.get('last_viewed_jewelries', []))

        response = self.client.get(reverse(
            'view_jewelry', kwargs={'pk': self.jewelry.pk})
        )

        self.assertEqual(response.status_code, 302)

        last_viewed_jewelries_count = self.client.session. \
            get('last_viewed_jewelries', [])

        self.assertEqual(len(
            last_viewed_jewelries_count),
            initial_last_viewed_jewelries_count + 1
        )

        self.assertIn(
            self.jewelry.pk,
            self.client.session.get('last_viewed_jewelries', [])
        )

        self.assertRedirects(
            response, reverse(
                'display_jewelry_details',
                args=[str(self.jewelry.pk)])
        )
