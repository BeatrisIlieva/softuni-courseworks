from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import (
    UserCreationForm,
    AuthenticationForm, UserChangeForm, PasswordChangeForm
)

from e_commerce_website.profiles.models import AccountProfile

UserModel = get_user_model()


class RegisterUserForm(UserCreationForm):
    consent = forms.BooleanField(
        required=True,
        label='I agree to the terms and conditions',
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
    )
    class Meta(UserCreationForm.Meta):
        model = UserModel
        fields = ['email', 'password1', 'password2', 'consent']

    def __init__(self, *args, **kwargs):
        super(RegisterUserForm, self).__init__(*args, **kwargs)

        self.fields['email'].label = False
        self.fields['password1'].label = False
        self.fields['password2'].label = False

        self.fields['email'].widget.attrs['placeholder'] = \
            'Enter your email'

        self.fields['password1'].widget.attrs['placeholder'] = \
            'Enter your password'

        self.fields['password2'].widget.attrs['placeholder'] = \
            'Confirm your password'

        self.fields['consent'].widget.attrs['class'] = 'form-check-input'

    def save(self, commit=True):
        user = super().save(commit=commit)
        account = AccountProfile(
            user=user,
        )
        if commit:
            account.save()

        return user


class LoginUserForm(AuthenticationForm):
    error_messages = {
        'invalid_login': 'Invalid email address or password. Please try again.',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].label = False
        self.fields['password'].label = False

        self.fields['username'].widget.attrs['placeholder'] = \
            'Enter your email'

        self.fields['password'].widget.attrs['placeholder'] = \
            'Enter your password'


class CustomUpdateEmailForm(UserChangeForm):
    class Meta:
        model = UserModel
        fields = ['email']

    def __init__(self, *args, **kwargs):
        super(CustomUpdateEmailForm, self).__init__(*args, **kwargs)

        self.fields['email'].label = 'Change your current email'
        self.fields['email'].widget.attrs['placeholder'] = 'Enter your new email'





class CustomUpdatePasswordForm(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super(CustomUpdatePasswordForm, self).__init__(*args, **kwargs)

        for fieldname in ['old_password', 'new_password1', 'new_password2']:
            self.fields[fieldname].help_text = None
            self.fields[fieldname].widget.attrs['placeholder'] = f'Enter {self.fields[fieldname].label.lower()}'
