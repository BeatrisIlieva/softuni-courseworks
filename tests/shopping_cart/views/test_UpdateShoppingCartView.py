from django.conf import settings
from django.test import Client
from django.urls import reverse
from django.test import TestCase as TestCase
from e_commerce_website.inventory.models import Inventory
from e_commerce_website.shopping_cart.models import ShoppingCart
from e_commerce_website.shopping_cart.views import AddToShoppingCartView, UpdateShoppingCartView
from e_commerce_website.jewelry.models import Category, Jewelry


class UpdateShoppingCartViewTests(TestCase):
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

        self.zero_quantity = \
            UpdateShoppingCartView.ZERO_QUANTITY

    def test_increase_shopping_cart_add_quantity__expect_inventory_quantity_decreased(self):
        initial_inventory_quantity = \
            Inventory.objects.get(jewelry=self.jewelry).quantity

        initial_shopping_cart_obj_count = \
            ShoppingCart.objects.count()

        response = self.client.get(reverse(
            'add_to_shopping_cart',
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

        new_quantity = 2

        response = self.client.post(
            reverse(
                'update_shopping_cart',
                kwargs={'pk': self.jewelry.pk}
            ),
            data={
                'jewelry_id': self.jewelry.pk,
                'quantity': new_quantity
            }
        )

        updated_shopping_cart = \
            ShoppingCart.objects.get(jewelry=self.jewelry)

        self.assertEqual(
            response.status_code,
            302
        )

        self.assertRedirects(
            response,
            reverse('view_shopping_cart')
        )

        self.assertEqual(
            updated_shopping_cart.quantity,
            new_quantity
        )

    def test_decrease_shopping_cart_decrease_quantity__expect_inventory_quantity_increased(self):
        initial_inventory_quantity = \
            Inventory.objects.get(jewelry=self.jewelry).quantity

        initial_shopping_cart_obj_count = \
            ShoppingCart.objects.count()

        response = self.client.get(reverse(
            'add_to_shopping_cart',
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

        new_quantity = self.zero_quantity

        response = self.client.post(
            reverse(
                'update_shopping_cart',
                kwargs={'pk': self.jewelry.pk}
            ),
            data={
                'jewelry_id': self.jewelry.pk,
                'quantity': new_quantity
            }
        )

        self.assertEqual(
            ShoppingCart.objects.count(),
            0
        )

        self.assertEqual(
            response.status_code,
            302
        )

        self.assertRedirects(
            response,
            reverse('view_shopping_cart')
        )
