from django import forms


from tasty_recipes_app.recipes.models import Recipe
from tasty_recipes_app.core.mixins import CapitalizeLabelsMixin, AddPlaceholdersMixin, DisableFieldsMixin


class RecipeBaseForm(CapitalizeLabelsMixin, AddPlaceholdersMixin, forms.ModelForm):
    placeholders = {
        'ingredients': 'ingredient1, ingredient2, ...',
        'instructions': 'Enter detailed instructions here...',
        'image_url': 'Optional image URL here...',
    }

    class Meta:
        model = Recipe
        exclude = ['author',]


class RecipeCreateForm(RecipeBaseForm):
    pass


class RecipeEditForm(RecipeBaseForm):
    pass


class RecipeDeleteForm(DisableFieldsMixin, RecipeBaseForm):
    pass
