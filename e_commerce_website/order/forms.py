from django import forms

from django.core.validators import RegexValidator

from e_commerce_website.order.validators import CardHasExpiredValidator


class CardDetailsForm(forms.Form):
    CARD_NUMBER_LENGTH = 16
    CARD_NUMBER_REGEX_PATTERN = r'^\d{16}$'
    CARD_NUMBER_ERROR_MESSAGE = f'The card number should be exactly {CARD_NUMBER_LENGTH} digits long.'

    EXPIRATION_DATE_FORMAT = 'DD/MM'
    EXPIRATION_DATE_REGEX_PATTERN = r'^\d{2}\/\d{2}$'
    EXPIRATION_DATE_FORMAT_ERROR_MESSAGE = f'The expiration date should be in the format {EXPIRATION_DATE_FORMAT}.'
    CARD_HAS_EXPIRED_ERROR_MESSAGE = f'This card has expired.'

    CVV_CODE_LENGTH = 3
    CVV_CODE_REGEX_PATTERN = r'^\d{3}$'
    CVV_CODE_ERROR_MESSAGE = f'The card number should be exactly {CVV_CODE_LENGTH} digits long.'



    card_number = forms.CharField(
        validators=[
            RegexValidator(
                regex=CARD_NUMBER_REGEX_PATTERN,
                message=CARD_NUMBER_ERROR_MESSAGE,
                code='invalid',
            )
        ]
    )

    expiration_date = forms.CharField(
        validators=[
            CardHasExpiredValidator(
                error_message=[CARD_HAS_EXPIRED_ERROR_MESSAGE, EXPIRATION_DATE_FORMAT_ERROR_MESSAGE],
            ),
        ]
    )

    cvv_code = forms.CharField(
        validators=[
            RegexValidator(
                regex=CVV_CODE_REGEX_PATTERN,
                message=CVV_CODE_ERROR_MESSAGE,
                code='invalid',
            )
        ]
    )
