from e_commerce_website.profiles.models import AccountProfile
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model

from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry,
    Size, JewelryMetal, JewelryStone, JewelrySize
)
from e_commerce_website.wishlist.models import JewelryLike


class LikeJewelryViewTests(TestCase):
    def setUp(self):
        self.client = Client()

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


    def test_add_to_liked_jewelries_authenticated_user(self):
        initial_likes_count = JewelryLike.objects.count()

        response = self.client.get(reverse('like_jewelry', kwargs={'jewelry_pk': self.jewelry.pk}))

        # Check that the response status code is 302 (redirect)
        self.assertEqual(response.status_code, 302)

        # Check that a new JewelryLike object is created for the user
        self.assertEqual(JewelryLike.objects.count(), initial_likes_count + 1)

        # Check that the created JewelryLike object has the correct jewelry and user
        new_like = JewelryLike.objects.last()
        self.assertEqual(new_like.jewelry, self.jewelry)
        self.assertEqual(new_like.user, self.user)

        self.assertRedirects(response, reverse('display_liked_jewelries'))


    def test_add_to_liked_jewelries_unauthenticated_user(self):
        # Get the initial count of liked jewelries in the session
        initial_liked_jewelries_count = len(self.client.session.get('liked_jewelries', []))

        # Make a GET request to the AddToLikedJewelriesView
        response = self.client.get(reverse('like_jewelry', kwargs={'jewelry_pk': self.jewelry.pk}))

        # Check that the response status code is 302 (redirect)
        self.assertEqual(response.status_code, 302)

        # Check that the liked_jewelries in the session is updated correctly
        liked_jewelries_in_session = self.client.session.get('liked_jewelries', [])
        self.assertIn(self.jewelry.pk, liked_jewelries_in_session)

        self.assertEqual(len(liked_jewelries_in_session), initial_liked_jewelries_count + 1)

        # Check that the user is redirected to the 'display_liked_jewelries' view
        self.assertRedirects(response, reverse('display_liked_jewelries'))