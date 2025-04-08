from django.test import Client
from django.urls import reverse
from django.test import TestCase as TestCase

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import Category, Jewelry, Metal, StoneType, StoneColor, JewelryMetal, \
    JewelryStone


class DisplayLikedJewelriesViewTests(TestCase):
    def setUp(self):
        self.client = Client()

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.another_category = Category.objects.create(
            title=Category.TitleChoices.BRACELET
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

        self.not_enough_quantity_jewelry = Jewelry.objects.create(
            title='Not Enough Quantity Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
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

        self.metal = Metal.objects.create(
            title=Metal.TitleChoices.PLATINUM
        )

        self.stone_type = StoneType.objects.create(
            title=StoneType.TitleChoices.DIAMOND
        )


        self.stone_color = StoneColor.objects.create(
            title=StoneColor.TitleChoices.YELLOW
        )

        JewelryMetal.objects.create(
            jewelry=self.jewelry,
            metal=self.metal
        )

        self.expected_metal_count = 1

        self.expected_metal_title = self.metal.get_title_display()

        JewelryStone.objects.create(
            jewelry=self.jewelry,
            stone_type=self.stone_type,
            stone_color=self.stone_color
        )

        self.expected_stone_type_count = 1

        self.expected_stone_type_title = self.stone_type.get_title_display()

        self.expected_stone_color_count = 1
        self.expected_stone_color_title = self.stone_color.get_title_display()


    def test_display_jewelries_by_category_view__expect_one_obj(self):
        response = self.client.get(reverse(
            'display_jewelries_by_category',
            args=[str(self.category.pk)])
        )

        self.assertEqual(response.status_code, 200)

        self.assertTemplateUsed(
            response,
            'jewelry/display-jewelries-by-category.html'
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

    def test_display_jewelries_by_category_view__expect_metal_count_to_be_equal_to_one(self):
        response = self.client.get(reverse(
            'display_jewelries_by_category',
            args=[str(self.category.pk)])
        )

        self.assertIn('jewelries_count_by_metal', response.context)

        actual_metal_count = response.context['jewelries_count_by_metal'][self.expected_metal_title]

        self.assertEqual(actual_metal_count, self.expected_metal_count)

    def test_display_jewelries_by_category_view__expect_stone_type_count_to_be_equal_to_one(self):
        response = self.client.get(reverse(
            'display_jewelries_by_category',
            args=[str(self.category.pk)])
        )

        self.assertIn('jewelries_count_by_stone_type', response.context)

        actual_stone_type_count = response.context['jewelries_count_by_stone_type'][self.expected_stone_type_title]

        self.assertEqual(actual_stone_type_count, self.expected_stone_type_count)


    def test_display_jewelries_by_category_view__expect_stone_color_count_to_be_equal_to_one(self):
        response = self.client.get(reverse(
            'display_jewelries_by_category',
            args=[str(self.category.pk)])
        )

        self.assertIn('jewelries_count_by_stone_color', response.context)

        actual_stone_color_count = response.context['jewelries_count_by_stone_color'][self.expected_stone_color_title]

        self.assertEqual(actual_stone_color_count, self.expected_stone_color_count)



