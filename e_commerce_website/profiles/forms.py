from django import forms
from django_countries import countries
from e_commerce_website.profiles.models import AccountProfile


class AccountProfileForm(forms.ModelForm):
    country = forms.ChoiceField(choices=countries)

    class Meta:
        model = AccountProfile
        exclude = ('user',)

        labels = {
            'first_name': 'Your First Name',
            'last_name': 'Your Surname',
            'phone_number': 'Your Phone Number',
            'city': 'City',
            'delivery_address': 'Address'
        }

        widgets = {
            'first_name': forms.TextInput(
                attrs={
                    'placeholder': 'Enter Your First Name'
                }
            ),

            'last_name': forms.TextInput(
                attrs={
                    'placeholder': 'Enter Your Surname'
                }
            ),

            'phone_number': forms.TextInput(
                attrs={
                    'placeholder': 'Enter Your Phone Number'
                }
            ),

            'city': forms.TextInput(
                attrs={
                    'placeholder': 'Enter Your City'
                }
            ),

            'delivery_address': forms.TextInput(
                attrs={
                    'placeholder': 'Enter Your Address'
                }
            ),
        }


