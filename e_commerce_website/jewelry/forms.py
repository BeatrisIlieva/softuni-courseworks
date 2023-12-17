from django import forms
from e_commerce_website.jewelry.models import Style, Metal, StoneType, StoneColor, JewelryDetails


class JewelryForm(forms.Form):
    PRICE_CHOICES = JewelryDetails.PriceChoices.choices

    STYLE_CHOICES = Style.TitleChoices.choices
    METAL_CHOICES = Metal.TitleChoices.choices
    STONE_TYPES_CHOICES = StoneType.TitleChoices.choices
    STONE_COLOR_CHOICES = StoneColor.TitleChoices.choices

    order_by_price = forms.MultipleChoiceField(
        choices=PRICE_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )

    style_choices = forms.MultipleChoiceField(
        choices=STYLE_CHOICES,
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
