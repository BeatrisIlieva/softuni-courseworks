from django import forms
from django.core.validators import RegexValidator
from e_commerce_website.order.validators import ExpirationDateValidator


class CardDetailsForm(forms.Form):
    CARD_NUMBER_LENGTH = 16
    CARD_NUMBER_REGEX_PATTERN = r'^\d{16}$'
    CARD_NUMBER_ERROR_MESSAGE = \
        f'The card number should be exactly {CARD_NUMBER_LENGTH} digits long.'

    EXPIRATION_DATE_FORMAT = 'DD/MM'
    EXPIRATION_DATE_FORMAT_ERROR_MESSAGE = \
        f'The expiration date should be in the format {EXPIRATION_DATE_FORMAT}.'
    CARD_HAS_EXPIRED_ERROR_MESSAGE = \
        f'This card has expired.'

    CVV_CODE_LENGTH = 3
    CVV_CODE_REGEX_PATTERN = r'^\d{3}$'
    CVV_CODE_ERROR_MESSAGE = \
        f'The CVV code should be exactly {CVV_CODE_LENGTH} digits long.'

    card_number = forms.CharField(
        max_length=str(CARD_NUMBER_LENGTH),

        label='Card Number:',

        widget=forms.TextInput(
            attrs={
                'placeholder': 'Enter Valid Card Number',
            }
        ),

        validators=[
            RegexValidator(
                regex=CARD_NUMBER_REGEX_PATTERN,
                message=CARD_NUMBER_ERROR_MESSAGE,
                code='invalid',
            )
        ]
    )

    expiration_date = forms.CharField(
        max_length=str(len(EXPIRATION_DATE_FORMAT)),

        label='Expiration Date:',

        widget=forms.TextInput(
            attrs={
                'placeholder': 'MM/YY',
            }
        ),

        validators=[
            ExpirationDateValidator(
                error_message=[
                    CARD_HAS_EXPIRED_ERROR_MESSAGE,
                    EXPIRATION_DATE_FORMAT_ERROR_MESSAGE
                ],
            ),
        ]
    )

    cvv_code = forms.CharField(
        max_length=str(CVV_CODE_LENGTH),
        label='CVV:',
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Enter CVV Code',
            }
        ),

        validators=[
            RegexValidator(
                regex=CVV_CODE_REGEX_PATTERN,
                message=CVV_CODE_ERROR_MESSAGE,
                code='invalid',
            )
        ]
    )
