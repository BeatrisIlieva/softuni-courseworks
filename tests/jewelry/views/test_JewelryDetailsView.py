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

    def test_jewelry_details_view(self):
        # Access the jewelry details view
        response = self.client.get(reverse('display_jewelry_details', kwargs={'pk': self.jewelry.pk}))

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check if the correct template is used
        self.assertTemplateUsed(response, 'jewelry/jewelry_details.html')

        # Check if the jewelry instance is present in the context
        self.assertEqual(response.context['object'], self.jewelry)

        # You can add more specific checks based on the expected behavior of the view

        # Example: Check if the form is present in the context
        self.assertIn('form', response.context)

        # Example: Check if the last viewed jewelries are present in the context
        self.assertIn('last_viewed_jewelries', response.context)


