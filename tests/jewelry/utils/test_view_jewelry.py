from django.test import Client, TestCase
from django.urls import reverse
from e_commerce_website.jewelry.models import Jewelry, Category


class ViewJewelryTest(TestCase):
    def setUp(self):
        self.client = Client()

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.first_jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        self.second_jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        self.third_jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        self.fourth_jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

    def test_view_jewelry_function__insert__four_objects__expect_three(self):
        self.client.get(reverse(
            'view_jewelry',
            kwargs={'pk': self.first_jewelry.pk})
        )

        self.client.get(reverse(
            'view_jewelry',
            kwargs={'pk': self.second_jewelry.pk})
        )

        self.client.get(reverse(
            'view_jewelry',
            kwargs={'pk': self.third_jewelry.pk})
        )

        self.client.get(reverse(
            'view_jewelry',
            kwargs={'pk': self.fourth_jewelry.pk})
        )

        updated_last_viewed_jewelries = \
            self.client.session.get('last_viewed_jewelries', [])

        self.assertIn(
            self.second_jewelry.pk,
            updated_last_viewed_jewelries
        )

        self.assertIn(
            self.third_jewelry.pk,
            updated_last_viewed_jewelries
        )

        self.assertIn(
            self.fourth_jewelry.pk,
            updated_last_viewed_jewelries
        )

        self.assertLessEqual(
            len(updated_last_viewed_jewelries), 3
        )

        self.assertEqual(
            updated_last_viewed_jewelries[-1],
            self.fourth_jewelry.pk
        )
