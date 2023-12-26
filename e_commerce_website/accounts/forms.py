from django.utils.translation import gettext_lazy as _
from django import forms
from django.contrib.auth.forms import UserCreationForm


class RegisterUserForm(UserCreationForm):
    consent = forms.BooleanField(
        required=True,
    )

    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput(attrs={"autocomplete": "new-password"}),
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].help_text = 'IIt works'



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
