from django.conf import settings
from django.test import Client
from django.urls import reverse
from django.test import TestCase as TestCase

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.shopping_cart.models import ShoppingCart
from e_commerce_website.shopping_cart.views import AddToShoppingCartView, DisplayShoppingCartView
from e_commerce_website.jewelry.models import Category, Jewelry


class DisplayShoppingCartViewTests(TestCase):
    def setUp(self):
        self.client = Client()

        session = self.client.session
        session.save()

        self.client.cookies[settings.SESSION_COOKIE_NAME] = \
            session.session_key

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        Inventory.objects.create(
            jewelry=self.jewelry,
            quantity=10,
            price=5
        )

        self.added_quantity_to_shopping_cart = \
            AddToShoppingCartView. \
                QUANTITY_TO_DECREASE_UPON_ADDING_TO_SHOPPING_CART

        self.added_quantity_to_shopping_cart_if_exists = \
            AddToShoppingCartView. \
                QUANTITY_TO_INCREASE_IF_EXISTING_SHOPPING_CART

    def test_display_shopping_cart__expect__all_added_obj_to_be_displayed(self):
        initial_inventory_quantity = \
            Inventory.objects.get(jewelry=self.jewelry).quantity

        initial_shopping_cart_obj_count = \
            ShoppingCart.objects.count()

        response = self.client.get(
            reverse('add_to_shopping_cart',
                    kwargs={'pk': self.jewelry.pk})
        )

        new_inventory_quantity = \
            Inventory.objects.get(jewelry=self.jewelry).quantity

        new_shopping_cart_quantity = \
            ShoppingCart.objects.get(jewelry=self.jewelry).quantity

        self.assertEqual(
            response.status_code,
            302
        )

        self.assertEqual(
            ShoppingCart.objects.count(),
            initial_shopping_cart_obj_count + 1
        )

        new_shopping_cart_obj = \
            ShoppingCart.objects.last()

        self.assertEqual(
            new_shopping_cart_obj.jewelry,
            self.jewelry
        )

        self.assertEqual(
            new_inventory_quantity,
            initial_inventory_quantity - self.added_quantity_to_shopping_cart
        )

        self.assertEqual(
            new_shopping_cart_quantity,
            self.added_quantity_to_shopping_cart
        )

        self.assertRedirects(
            response,
            reverse('view_shopping_cart')
        )

        expected_min_quantity = \
            DisplayShoppingCartView.MIN_QUANTITY

        already_added_quantity = 1

        expected_max_quantity = \
            Inventory.objects.get(jewelry=self.jewelry). \
                quantity + already_added_quantity

        response = self.client.get(
            reverse('view_shopping_cart')
        )

        jewelry_price = \
            Inventory.objects.get(jewelry=self.jewelry).price

        expected_total_price = \
            Inventory.objects.get(jewelry=self.jewelry).price

        current_quantity = \
            ShoppingCart.objects.get(jewelry=self.jewelry).quantity

        expected_jewelry_total_price = \
            current_quantity * jewelry_price

        jewelry_data = \
            response.context['jewelries_by_quantities'][self.jewelry]

        self.assertEqual(
            jewelry_data['quantity'],
            current_quantity
        )

        self.assertEqual(
            jewelry_data['min_quantity'],
            expected_min_quantity
        )

        self.assertEqual(
            jewelry_data['max_quantity'],
            expected_max_quantity
        )

        self.assertEqual(
            jewelry_data['jewelry_total_price'],
            expected_jewelry_total_price
        )

        self.assertEqual(
            response.context['total_price'],
            expected_total_price
        )
