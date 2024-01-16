from django import forms
from django_countries import countries

from e_commerce_website.profiles.models import AccountProfile


class AccountProfileForm(forms.ModelForm):
    country = forms.ChoiceField(choices=countries)

    class Meta:
        model = AccountProfile
        exclude = ('user',)

        labels = {
            'first_name': 'Your first name',
            'last_name': 'Your surname',
            'phone_number': 'Your phone number'
        }

        widgets = {
            'first_name': forms.TextInput(
                attrs={
                    'placeholder': 'Enter your first name'
                }
            ),
            'last_name':forms.TextInput(
                attrs={
                    'placeholder': 'Enter your surname'
                }
            ),
            'phone_number': forms.TextInput(
                attrs={
                    'placeholder': 'Enter your phone number'
                }
            ),

            'city': forms.TextInput(
                attrs={
                    'placeholder': 'Enter your city'
                }
            ),
            'delivery_address': forms.TextInput(
                attrs={
                    'placeholder': 'Enter your address'
                }
            ),
        }