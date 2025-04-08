from django.test import Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.test import TestCase as TestCase
from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry,
    Size, JewelryMetal, JewelryStone, JewelrySize
)


class DisplayLikedJewelriesViewTests(TestCase):
    def setUp(self):
        self.client = Client()

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.metal = Metal.objects.create(
            title=Metal.TitleChoices.PLATINUM
        )

        self.stone_type = StoneType.objects.create(
            title=StoneType.TitleChoices.DIAMOND
        )

        self.stone_color = StoneColor.objects.create(
            title=StoneColor.TitleChoices.YELLOW
        )

        self.size = Size.objects.create(
            measurement=Size.MeasurementChoices.V_19_10,
            category=self.category
        )

        self.jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        JewelryMetal.objects.create(
            jewelry=self.jewelry,
            metal=self.metal
        )

        JewelryStone.objects.create(
            jewelry=self.jewelry,
            stone_type=self.stone_type,
            stone_color=self.stone_color
        )

        JewelrySize.objects.create(
            jewelry=self.jewelry,
            size=self.size
        )

    def test_add_to_liked_jewelries__authenticated_user__expect_to_be_stored_in_session(self):
        user_data = {
            'email': 'beatris@icloud.com',
            'password1': 'securepassword123',
            'password2': 'securepassword123',
            'consent': True
        }

        self.client.post(
            reverse('register_user'), data=user_data
        )

        self.user = get_user_model(). \
            objects.get(email=user_data['email'])

        self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        response = self.client.get(
            reverse('display_liked_jewelries')
        )

        self.assertEqual(
            response.status_code,
            200
        )

        self.assertTemplateUsed(
            response,
            'wishlist/liked_jewelries.html'
        )

        self.assertIn(
            self.jewelry,
            response.context['object_list']
        )

    def test_add_to_liked_jewelries_unauthenticated_user(self):
        self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        response = self.client.get(
            reverse('display_liked_jewelries')
        )

        self.assertEqual(
            response.status_code,
            200
        )

        self.assertTemplateUsed(
            response,
            'wishlist/liked_jewelries.html'
        )

        self.assertIn(
            self.jewelry,
            response.context['object_list']
        )
