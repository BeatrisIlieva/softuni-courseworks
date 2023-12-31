from django import forms
from e_commerce_website.jewelry.models import Metal, StoneType, StoneColor, Jewelry, Size, Category


class JewelryForm(forms.Form):
    PRICE_CHOICES = Jewelry.PriceChoices.choices
    CATEGORY_CHOICES = Category.TitleChoices.choices
    METAL_CHOICES = Metal.TitleChoices.choices
    STONE_TYPES_CHOICES = StoneType.TitleChoices.choices
    STONE_COLOR_CHOICES = StoneColor.TitleChoices.choices

    order_by_price = forms.MultipleChoiceField(
        choices=PRICE_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,

    )

    category_choices = forms.MultipleChoiceField(
        choices=CATEGORY_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )

    metal_choices = forms.MultipleChoiceField(
        choices=METAL_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )

    stone_type_choices = forms.MultipleChoiceField(
        choices=STONE_TYPES_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )

    stone_color_choices = forms.MultipleChoiceField(
        choices=STONE_COLOR_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )


class JewelryDetailsForm(forms.Form):
    SIZE_CHOICES = Size.MeasurementChoices.choices

    sizes = forms.MultipleChoiceField(
        choices=SIZE_CHOICES,
        required=False,
        widget=forms.RadioSelect,
    )