from django.test import TestCase
from e_commerce_website.shopping_cart.tasks import cleanup_expired_carts
from e_commerce_website.shopping_cart.models import ShoppingCart
from e_commerce_website.inventory.models import Inventory
from django.conf import settings
from django.test import Client
from django.urls import reverse
from e_commerce_website.jewelry.models import Category, Jewelry


class CleanupExpiredCartsTest(TestCase):
    def setUp(self):
        self.client = Client()

        session = self.client.session
        session.save()

        self.client.cookies[settings.SESSION_COOKIE_NAME] = \
            session.session_key

        self.session_cookie_age = \
            settings.SESSION_COOKIE_AGE

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

        self.inventory = Inventory.objects.create(
            jewelry=self.jewelry,
            quantity=10,
            price=5
        )

        self.client.get(
            reverse('add_to_shopping_cart',
                    kwargs={'pk': self.jewelry.pk})
        )

        self.expired_cart = ShoppingCart.objects. \
            get(jewelry=self.jewelry)

        self.expired_cart_pk = self.expired_cart.pk

    def test_cleanup_cart__when_expired__expect_quantity_back_to_inventory(self):
        initial_quantity = self.inventory.quantity

        cleanup_expired_carts()

        self.assertFalse(
            ShoppingCart.objects.
            filter(pk=self.expired_cart_pk).exists()
        )

        updated_inventory = Inventory.objects. \
            get(jewelry_id=self.jewelry).quantity

        self.assertEqual(
            initial_quantity,
            updated_inventory
        )
