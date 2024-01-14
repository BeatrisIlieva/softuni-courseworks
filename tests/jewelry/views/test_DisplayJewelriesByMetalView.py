from django.test import Client
from django.urls import reverse
from django.test import TestCase as TestCase

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import (
    Category, Jewelry, Metal, JewelryMetal,
)


class DisplayJewelriesByMetalViewTests(TestCase):
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

        self.metal = Metal.objects.create(
            title=Metal.TitleChoices.PLATINUM
        )

        self.another_metal = Metal.objects.create(
            title=Metal.TitleChoices.ROSE_GOLD
        )

        JewelryMetal.objects.create(
            jewelry=self.jewelry,
            metal=self.metal
        )

        JewelryMetal.objects.create(
            jewelry=self.another_jewelry,
            metal=self.another_metal
        )

        JewelryMetal.objects.create(
            jewelry=self.not_enough_quantity_jewelry,
            metal=self.metal
        )

        Inventory.objects.create(
            jewelry=self.jewelry,
            quantity=10, price=5
        )

        Inventory.objects.create(
            jewelry=self.another_jewelry,
            quantity=10, price=5
        )

        Inventory.objects.create(
            jewelry=self.not_enough_quantity_jewelry,
            quantity=0,
            price=5
        )

    def test_display_jewelries_by_metal_view__expect_one_obj(self):
        response = self.client.get(reverse(
            'display_jewelries_by_metal',
            args=[str(self.metal.pk)])
        )

        self.assertEqual(response.status_code, 200)

        self.assertTemplateUsed(
            response,
            'jewelry/display_jewelries_by_metal.html'
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
