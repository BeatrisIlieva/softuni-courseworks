from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django_countries import countries

from e_commerce_website.profiles.models import AccountProfile

UserModel = get_user_model()


class RegisterUserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        fields = (UserModel.USERNAME_FIELD,)

    consent = forms.BooleanField(
        required=True,
    )

    def save(self, commit=True):
        user = super().save(commit=commit)
        account = AccountProfile(
            user=user,
        )
        if commit:
            account.save()

        return user


class AccountProfileForm(forms.ModelForm):
    country = forms.ChoiceField(choices=countries)

    class Meta:
        model = AccountProfile
        exclude = ('user',)
