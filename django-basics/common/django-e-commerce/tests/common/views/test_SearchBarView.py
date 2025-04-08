from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry,
    Size, JewelryMetal, JewelryStone, JewelrySize
)

from django.test import TestCase
from django.urls import reverse


class SearchBarViewTests(TestCase):
    def setUp(self):
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

        self.not_enough_quantity_stone_color = \
            StoneColor.objects.create(
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

        self.not_enough_quantity_jewelry = Jewelry.objects.create(
            title='Not Enough Quantity Jewelry',
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

        JewelryStone.objects.create(
            jewelry=self.not_enough_quantity_jewelry,
            stone_type=self.stone_type,
            stone_color=self.not_enough_quantity_stone_color
        )

        JewelrySize.objects.create(
            jewelry=self.jewelry,
            size=self.size
        )

        Inventory.objects.create(
            jewelry=self.jewelry,
            quantity=10,
            price=5
        )

        Inventory.objects.create(
            jewelry=self.not_enough_quantity_jewelry,
            quantity=0,
            price=5
        )

    def test_search_results__when_search_pattern__expect_one_obj_in_object_list(self):
        search_query = self.stone_color.get_title_display()

        response = self.client.get(
            reverse('search_bar'),
            {'search': search_query}
        )

        self.assertEqual(
            response.status_code,
            200
        )

        self.assertTemplateUsed(
            response,
            'common/search-results.html'
        )

        self.assertEqual(
            response.context['search'],
            search_query
        )

        self.assertIn(
            self.jewelry,
            response.context['object_list']
        )

        self.assertNotIn(
            self.not_enough_quantity_jewelry,
            response.context['object_list']
        )
