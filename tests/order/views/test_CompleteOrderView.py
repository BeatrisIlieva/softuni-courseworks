from django.conf import settings
from django.test import Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.test import TestCase as TestCase
from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import Category, Jewelry


class AddToShoppingCartViewTests(TestCase):
    def setUp(self):
        self.client = Client()

        session = self.client.session
        session.save()

        self.client.cookies[settings.SESSION_COOKIE_NAME] = \
            session.session_key

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        Inventory.objects.create(
            jewelry=self.jewelry,
            quantity=10,
            price=5
        )

    def test_complete_order__when_details_provided__expect_redirect(self):
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

        user = get_user_model(). \
            objects.get(email=user_data['email'])

        profile_data = {
            'first_name': 'Beatris',
            'last_name': 'Ilieve',
            'phone_number': '0000000000',
            'country': 'BG',
            'city': 'Sofia',
            'delivery_address': 'Some Address',
            'user': user

        }

        self.client.get(
            reverse('add_to_shopping_cart',
                    kwargs={'pk': self.jewelry.pk})
        )

        response = self.client.post(
            reverse(
                'complete_order', kwargs={'pk': user.pk}
            ),
            data={
                **profile_data
            }
        )

        self.assertEqual(
            response.status_code,
            302
        )

        self.assertRedirects(response, reverse(
            'complete_transaction',
            kwargs={'pk': user.pk})
                             )
