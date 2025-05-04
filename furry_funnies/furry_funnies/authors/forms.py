from django import forms

from furry_funnies.authors.models import Author
from furry_funnies.core.mixins import (
    AddPlaceholderMixin,
    CapitalizeLabelsWordsMixin
)


class AuthorCreateForm(
    AddPlaceholderMixin,
    CapitalizeLabelsWordsMixin,
    forms.ModelForm
):
    placeholders = {
        'first_name': 'Enter your first name...',
        'last_name': 'Enter your last name...',
        'passcode': 'Enter 6 digits...',
        'pets_number': 'Enter the number of your pets...'

    }

    class Meta:
        model = Author
        fields = [
            'first_name',
            'last_name',
            'passcode',
            'pets_number'
        ]

        widgets = {
            'passcode': forms.PasswordInput(),
        }


class ProfileUpdateForm(
    AddPlaceholderMixin,
    CapitalizeLabelsWordsMixin,
    forms.ModelForm
):
    placeholders = {
        'first_name': 'Enter your first name...',
        'last_name': 'Enter your last name...',
        'pets_number': 'Enter the number of your pets...'

    }

    class Meta:
        model = Author
        fields = [
            'first_name',
            'last_name',
            'pets_number',
            'info',
            'image_url'
        ]
