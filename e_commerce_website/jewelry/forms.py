from django import forms
from e_commerce_website.inventory.models import Inventory
from e_commerce_website.jewelry.models import (
    Metal, StoneType, StoneColor, Size, Category
)


class SizeForm(forms.Form):
    SIZE_CHOICES = Size.MeasurementChoices.choices

    sizes = forms.ChoiceField(
        choices=SIZE_CHOICES,
        required=True,
        widget=forms.RadioSelect,
    )


class PriceForm(forms.Form):
    PRICE_CHOICES = Inventory.PriceChoices.choices

    price_choices = forms.MultipleChoiceField(
        choices=PRICE_CHOICES,
        required=False,
        label='Price',
        widget=forms.CheckboxSelectMultiple,

    )


class CategoryForm(forms.Form):
    CATEGORY_CHOICES = Category.TitleChoices.choices

    category_choices = forms.MultipleChoiceField(
        choices=CATEGORY_CHOICES,
        required=False,
        label='Category',
        widget=forms.CheckboxSelectMultiple,
    )


class MetalForm(forms.Form):
    METAL_CHOICES = Metal.TitleChoices.choices

    metal_choices = forms.MultipleChoiceField(
        choices=METAL_CHOICES,
        required=False,
        label='Metal',
        widget=forms.CheckboxSelectMultiple,
    )


class StoneTypeForm(forms.Form):
    STONE_TYPES_CHOICES = StoneType.TitleChoices.choices
    stone_type_choices = forms.MultipleChoiceField(
        choices=STONE_TYPES_CHOICES,
        required=False,
        label='Gemstone Type',
        widget=forms.CheckboxSelectMultiple,
    )


class StoneColorForm(forms.Form):
    STONE_COLOR_CHOICES = StoneColor.TitleChoices.choices

    stone_color_choices = forms.MultipleChoiceField(
        choices=STONE_COLOR_CHOICES,
        required=False,
        label='Gemstone Color',
        widget=forms.CheckboxSelectMultiple,
    )


class JewelryCategoryForm(
    StoneColorForm, StoneTypeForm,
    MetalForm, PriceForm
):
    pass


class JewelryMetalForm(
    StoneColorForm, StoneTypeForm,
    CategoryForm, PriceForm
):
    pass


class JewelryStoneTypeForm(
    StoneColorForm, MetalForm,
    CategoryForm, PriceForm
):
    pass


class JewelryStoneColorForm(
    StoneTypeForm, MetalForm,
    CategoryForm, PriceForm
):
    pass
