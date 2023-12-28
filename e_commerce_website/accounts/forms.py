from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django import forms
from django.contrib.auth.forms import UserCreationForm

from e_commerce_website.accounts.models import AccountProfile

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

    # password2 = forms.CharField(
    #     label=_("Password confirmation"),
    #     widget=forms.PasswordInput(attrs={"autocomplete": "new-password"}),
    #     strip=False,
    #     help_text=_("Enter the same password as before, for verification."),
    # )
    #
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.fields['password1'].help_text = 'IIt works'

# class LoginForm(forms.ModelForm):
#     class Meta:
#         model = Account
#         fields = ('username', 'password',)
#
#
# class ProfileForm(forms.ModelForm):
#     MIN_USERNAME_LENGTH = 6
#     MAX_USERNAME_LENGTH = 26
#     MIN_PASSWORD_LENGTH = 8
#     MAX_PASSWORD_LENGTH = 16
#
#     class Meta:
#         model = Account
#         fields = ('username', 'password',)
#
#         # error_messages = {
#         #     'username': {
#         #
#         #     }
#         # }
#
#     username = forms.CharField(
#         validators=[
#
#             ValueInRangeValidator(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH),
#
#         ],
#         error_messages={
#             'required': 'Custom message',
#             'invalid': 'Custom message',
#         }
#     )
#
#     password = forms.CharField(
#         validators=[
#
#             ValueInRangeValidator(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
#
#         ],
#         error_messages={
#             'required': 'Custom message',
#             'invalid': 'Custom message',
#         }
#
#     )
