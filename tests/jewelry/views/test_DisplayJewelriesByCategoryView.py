from django.test import Client
from django.urls import reverse
from django.test import TestCase as TestCase

from e_commerce_website.inventory.models import Inventory
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

        self.another_category = Category.objects.create(
            title=Category.TitleChoices.BRACELET
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

        self.another_jewelry = Jewelry.objects.create(
            title='Another Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.another_category
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

        Inventory.objects.create(jewelry=self.jewelry, quantity=10, price=5)
        Inventory.objects.create(jewelry=self.another_jewelry, quantity=10, price=5)

    def test_filtration__expect__necklace_category(self):
        response = self.client.get(reverse('display_jewelries_by_category', args=[str(self.category.pk)]))

        self.assertEqual(response.status_code, 200)

        self.assertTemplateUsed(response, 'jewelry/display_jewelries_by_category.html')

        self.assertIn(self.jewelry, response.context['object_list'])

        self.assertNotIn(self.another_jewelry, response.context['object_list'])