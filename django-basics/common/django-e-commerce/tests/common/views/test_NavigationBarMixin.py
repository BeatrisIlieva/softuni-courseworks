from django.test import TestCase

from e_commerce_website.common.mixins import NavigationBarMixin
from e_commerce_website.jewelry.models import Category, Metal, StoneType, StoneColor


class NavigationBarMixinTestCase(TestCase):
    def setUp(self):
        Category.objects.create(
            title=Category.TitleChoices.BRACELET
        )

        Metal.objects.create(
            title=Metal.TitleChoices.YELLOW_GOLD
        )

        StoneType.objects.create(
            title=StoneType.TitleChoices.DIAMOND
        )

        StoneColor.objects.create(
            title=StoneColor.TitleChoices.AQUAMARINE
        )

    def test_get_nav_bar_context(self):
        mixin_instance = NavigationBarMixin()

        context = mixin_instance.get_nav_bar_context()

        self.assertEqual(
            1,
            len(context['categories_by_choices'])
        )

        self.assertEqual(
            1,
            len(context['metals_by_choices'])
        )

        self.assertEqual(
            1,
            len(context['stone_types_by_choices'])
        )

        self.assertEqual(
            1, len(context['stone_colors_by_choices'])
        )
