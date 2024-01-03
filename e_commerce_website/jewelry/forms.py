from django import forms
from e_commerce_website.jewelry.models import Metal, StoneType, StoneColor, Jewelry, Size, Category


class JewelryForm(forms.Form):
    PRICE_CHOICES = Jewelry.PriceChoices.choices
    CATEGORY_CHOICES = Category.TitleChoices.choices
    METAL_CHOICES = Metal.TitleChoices.choices
    STONE_TYPES_CHOICES = StoneType.TitleChoices.choices
    STONE_COLOR_CHOICES = StoneColor.TitleChoices.choices

    price_choices = forms.MultipleChoiceField(
        choices=PRICE_CHOICES,
        required=False,
        label='Price',
        widget=forms.CheckboxSelectMultiple,

    )

    category_choices = forms.MultipleChoiceField(
        choices=CATEGORY_CHOICES,
        required=False,
        label='Category',
        widget=forms.CheckboxSelectMultiple,
    )

    metal_choices = forms.MultipleChoiceField(
        choices=METAL_CHOICES,
        required=False,
        label='Metal',
        widget=forms.CheckboxSelectMultiple,
    )

    stone_type_choices = forms.MultipleChoiceField(
        choices=STONE_TYPES_CHOICES,
        required=False,
        label='Gemstone Type',
        widget=forms.CheckboxSelectMultiple,
    )

    stone_color_choices = forms.MultipleChoiceField(
        choices=STONE_COLOR_CHOICES,
        required=False,
        label='Gemstone Color',
        widget=forms.CheckboxSelectMultiple,
    )


class JewelryDetailsForm(forms.Form):
    SIZE_CHOICES = Size.MeasurementChoices.choices

    sizes = forms.MultipleChoiceField(
        choices=SIZE_CHOICES,
        required=False,
        widget=forms.RadioSelect,
    )


class PriceForm(forms.Form):
    PRICE_CHOICES = Jewelry.PriceChoices.choices

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


class JewelryCategoryForm(StoneTypeForm, MetalForm, PriceForm):
    pass

class JewelryMetalForm(StoneTypeForm, CategoryForm, PriceForm):
    pass

