from django import forms
from django.core.validators import RegexValidator

from e_commerce_website.shopping_cart.validators import check_card_has_expired


class QuantityUpdateForm(forms.Form):
    quantity = forms.IntegerField(min_value=0)
    jewelry_id = forms.IntegerField(widget=forms.HiddenInput())


class CardDetailsForm(forms.Form):
    CARD_NUMBER_LENGTH = 16
    CARD_NUMBER_REGEX_PATTERN = r'^\d{16}$'
    EXPIRATION_DATE_FORMAT = 'YY/MM'
    EXPIRATION_DATE_REGEX_PATTERN = r'^\d{2}\/\d{2}$'
    CVV_CODE_LENGTH = 3
    CVV_CODE_REGEX_PATTERN = r'^\d{3}$'

    card_number = forms.CharField(
        validators=[
            RegexValidator(
                regex=CARD_NUMBER_REGEX_PATTERN,
                message=f'The card number should be exactly {CARD_NUMBER_LENGTH} digits long.',
                code='invalid',
            )
        ]
    )

    expiration_date = forms.CharField(
        validators=[
            RegexValidator(
                regex=EXPIRATION_DATE_REGEX_PATTERN,
                message=f'The expiration date should be in the format {EXPIRATION_DATE_FORMAT}.',
                code='invalid',
            ),
            check_card_has_expired,

        ]
    )

    cvv_code = forms.CharField(
        validators=[
            RegexValidator(
                regex=CVV_CODE_REGEX_PATTERN,
                message=f'The card number should be exactly {CVV_CODE_LENGTH} digits long.',
                code='invalid',
            )
        ]
    )
