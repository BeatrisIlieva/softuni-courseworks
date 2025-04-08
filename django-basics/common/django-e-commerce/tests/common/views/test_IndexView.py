from django.test import TestCase
from django.urls import reverse


class IndexViewTests(TestCase):
    def test_index__when_no_selection__expect_empty_selection(self):
        response = self.client.get(
            reverse('index_page'),
        )

        self.assertEqual(
            200, response.status_code
        )

        self.assertTemplateUsed(
            response, 'common/index.html'
        )

        self.assertIn(
            'categories_by_choices', response.context
        )

        self.assertIn(
            'metals_by_choices', response.context
        )

        self.assertIn(
            'stone_types_by_choices', response.context
        )

        self.assertIn(
            'stone_colors_by_choices', response.context
        )
