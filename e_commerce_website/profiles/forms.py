from django import forms
from django_countries import countries

from e_commerce_website.profiles.models import AccountProfile


class AccountProfileForm(forms.ModelForm):
    country = forms.ChoiceField(choices=countries)

    class Meta:
        model = AccountProfile
        exclude = ('user',)