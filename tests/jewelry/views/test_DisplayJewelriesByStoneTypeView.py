from django.test import Client
from django.urls import reverse
from django.test import TestCase as TestCase

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import (
    Category, StoneType, StoneColor, Jewelry, JewelryStone,
)


class DisplayJewelriesByStoneTypeViewTests(TestCase):
    def setUp(self):
        self.client = Client()

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.stone_type = StoneType.objects.create(
            title=StoneType.TitleChoices.DIAMOND
        )

        self.another_stone_type = StoneType.objects.create(
            title=StoneType.TitleChoices.SAPPHIRE
        )

        self.stone_color = StoneColor.objects.create(
            title=StoneColor.TitleChoices.YELLOW
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
            category=self.category
        )

        self.not_enough_quantity_jewelry = Jewelry.objects.create(
            title='Not Enough Quantity Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        JewelryStone.objects.create(
            jewelry=self.jewelry,
            stone_type=self.stone_type,
            stone_color=self.stone_color
        )

        JewelryStone.objects.create(
            jewelry=self.another_jewelry,
            stone_type=self.another_stone_type,
            stone_color=self.stone_color
        )

        JewelryStone.objects.create(
            jewelry=self.not_enough_quantity_jewelry,
            stone_type=self.another_stone_type,
            stone_color=self.stone_color
        )

        Inventory.objects.create(
            jewelry=self.jewelry,
            quantity=10,
            price=5
        )

        Inventory.objects.create(
            jewelry=self.another_jewelry,
            quantity=10,
            price=5
        )

        Inventory.objects.create(
            jewelry=self.not_enough_quantity_jewelry,
            quantity=0,
            price=5
        )

    def test_display_jewelries_by_stone_type_view(self):
        response = self.client.get(
            reverse('display_jewelries_by_stone_type',
                    args=[str(self.stone_type.pk)])
        )

        self.assertEqual(response.status_code, 200)

        self.assertTemplateUsed(
            response,
            'jewelry/display_jewelries_by_stone_type.html'
        )

        self.assertIn(
            self.jewelry,
            response.context['object_list']
        )

        self.assertNotIn(
            self.another_jewelry,
            response.context['object_list']
        )

        self.assertNotIn(
            self.not_enough_quantity_jewelry,
            response.context['object_list']
        )
