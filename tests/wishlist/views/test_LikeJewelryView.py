from django.test import Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.test import TestCase as TestCase
from e_commerce_website.wishlist.models import JewelryLike
from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry,
    Size, JewelryMetal, JewelryStone, JewelrySize
)


class LikeJewelryViewTests(TestCase):
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

    def test_add_to_liked_jewelries__authenticated_user__expect__to_be_stored_in_database(self):
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

        initial_likes_count = \
            JewelryLike.objects.count()

        response = self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        self.assertEqual(
            response.status_code,
            302
        )

        self.assertEqual(
            JewelryLike.objects.count(),
            initial_likes_count + 1
        )

        new_like = JewelryLike.objects.last()

        self.assertEqual(
            new_like.jewelry,
            self.jewelry
        )

        self.assertEqual(
            new_like.user,
            self.user
        )

        self.assertRedirects(
            response,
            reverse('display_liked_jewelries')
        )

    def test_add_to_liked_jewelries__unauthenticated_user__expect_to_be_stored_in_session(self):
        initial_liked_jewelries_count = \
            len(self.client.session.get('liked_jewelries', []))

        response = self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        self.assertEqual(
            response.status_code,
            302
        )

        liked_jewelries_in_session = \
            self.client.session.get('liked_jewelries', [])

        self.assertEqual(
            len(liked_jewelries_in_session),
            initial_liked_jewelries_count + 1
        )

        self.assertRedirects(
            response,
            reverse('display_liked_jewelries')
        )

    def test_remove_liked_jewelries__authenticated_user__expect_to_be_removed_from_database(self):
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

        initial_likes_count = \
            JewelryLike.objects.count()

        self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        self.assertEqual(
            JewelryLike.objects.count(),
            initial_likes_count + 1
        )

        self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        self.assertEqual(
            JewelryLike.objects.count(),
            initial_likes_count
        )

    def test_remove_liked_jewelries__unauthenticated_user__expect_to_be_removed_from_session(self):
        initial_liked_jewelries_count = \
            len(self.client.session.get('liked_jewelries', []))

        self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        liked_jewelries_in_session = \
            self.client.session.get('liked_jewelries', [])

        self.assertEqual(
            len(liked_jewelries_in_session),
            initial_liked_jewelries_count + 1
        )

        self.client.get(reverse(
            'like_jewelry',
            kwargs={'jewelry_pk': self.jewelry.pk})
        )

        liked_jewelries_in_session = \
            self.client.session.get('liked_jewelries', [])

        self.assertEqual(
            len(liked_jewelries_in_session),
            initial_liked_jewelries_count
        )
