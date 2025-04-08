from django.test import Client, TestCase
from django.urls import reverse
from e_commerce_website.jewelry.models import Jewelry, Category


class JewelryDetailsViewTest(TestCase):
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

    def test_jewelry_details_view__expect__single_obj(self):
        response = self.client.get(
            reverse('display_jewelry_details',
                    kwargs={'pk': self.jewelry.pk})
        )

        self.assertEqual(
            response.status_code, 200
        )

        self.assertTemplateUsed(
            response,
            'jewelry/jewelry-details.html'
        )

        self.assertEqual(
            response.context['object'],
            self.jewelry
        )

        self.assertIn(
            'form',
            response.context
        )

        self.assertIn(
            'last_viewed_jewelries',
            response.context
        )
