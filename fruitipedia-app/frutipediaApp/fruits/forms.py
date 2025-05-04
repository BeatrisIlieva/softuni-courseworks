from django import forms

from frutipediaApp.fruits.models import Fruit
from frutipediaApp.core.mixins import AddPlaceholderMixin, RemoveLabelMixin, DisableFieldsMixin


class FruitBaseForm(forms.ModelForm):
    class Meta:
        model = Fruit
        exclude = ['owner',]


class FruitCreateForm(AddPlaceholderMixin, RemoveLabelMixin, FruitBaseForm):
    placeholder_prefix = 'Fruit'


class FruitEditForm(FruitBaseForm):
    pass


class FruitDeleteForm(DisableFieldsMixin, forms.ModelForm):
    class Meta:
        model = Fruit
        exclude = ['owner', 'nutrition']
