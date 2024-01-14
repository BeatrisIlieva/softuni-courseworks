from django.conf import settings
from django.test import Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.test import TestCase as TestCase

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.shopping_cart.models import ShoppingCart
from e_commerce_website.shopping_cart.views import AddToShoppingCartView
from e_commerce_website.wishlist.models import JewelryLike
from e_commerce_website.jewelry.models import (
    Category, Metal, StoneType, StoneColor, Jewelry,
    Size, JewelryMetal, JewelryStone, JewelrySize
)


class AddToShoppingCartViewTests(TestCase):
    def setUp(self):
        self.client = Client()

        session = self.client.session
        session.save()

        self.client.cookies[settings.SESSION_COOKIE_NAME] = session.session_key

        self.category = Category.objects.create(
            title=Category.TitleChoices.NECKLACE
        )

        self.jewelry = Jewelry.objects.create(
            title='Test Jewelry',
            first_image_url='https://example.com/image1.jpg',
            second_image_url='https://example.com/image2.jpg',
            category=self.category
        )

    def test_complete_order__when_details_provided__expect_redirect(self):
        self.client.get(reverse('add_to_shopping_cart', kwargs={'pk': self.jewelry.pk}))
