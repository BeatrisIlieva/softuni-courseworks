from django import forms

from tasty_recipes_app.profiles.models import Profile
from tasty_recipes_app.core.mixins import CapitalizeLabelsMixin


class ProfileCreateForm(CapitalizeLabelsMixin, forms.ModelForm):
    class Meta:
        model = Profile
        exclude = ['bio',]


class ProfileUpdateForm(CapitalizeLabelsMixin, forms.ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'