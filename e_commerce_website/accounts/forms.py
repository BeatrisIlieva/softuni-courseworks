from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from e_commerce_website.profiles.models import AccountProfile

UserModel = get_user_model()


# class RegisterUserForm(UserCreationForm):
#     class Meta:
#         model = get_user_model()
#         fields = ['email', 'password1', 'password2']
#
#     def __init__(self, *args, **kwargs):
#         super(RegisterUserForm, self).__init__(*args, **kwargs)
#
#         # Adding placeholders to password fields
#         self.fields['password1'].widget.attrs['placeholder'] = 'Enter your password'
#         self.fields['password2'].widget.attrs['placeholder'] = 'Confirm your password'


class RegisterUserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        fields = ['email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(RegisterUserForm, self).__init__(*args, **kwargs)

        self.fields['email'].label = False
        self.fields['password1'].label = False
        self.fields['password2'].label = False

        self.fields['email'].widget.attrs['placeholder'] = 'Enter your email'
        self.fields['password1'].widget.attrs['placeholder'] = 'Enter your password'
        self.fields['password2'].widget.attrs['placeholder'] = 'Confirm your password'

    #     labels = {
    #         'email': 'Email:',
    #         'password1': 'Password',
    #         'password2': 'Password Confirmation'
    #     }
    #
    #     widgets = {
    #         'email': forms.TextInput(
    #             attrs={
    #                 'placeholder': 'Enter your email'
    #             }
    #         ),
    #
    #         'password1': forms.PasswordInput(
    #             attrs={
    #                 'placeholder': 'Enter your password'
    #             }
    #         ),
    #
    #         'password2': forms.PasswordInput(
    #             attrs={
    #                 'placeholder': 'Confirm your password'
    #             }
    #         ),
    #     }
    #
    # consent = forms.BooleanField(
    #     required=True,
    # )
    #
    # def save(self, commit=True):
    #     user = super().save(commit=commit)
    #     account = AccountProfile(
    #         user=user,
    #     )
    #     if commit:
    #         account.save()
    #
    #     return user
    #
    #
    #
