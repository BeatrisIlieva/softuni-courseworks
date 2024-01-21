from django.contrib.auth import get_user_model
from django.contrib.auth.forms import (
    UserCreationForm,
    AuthenticationForm
)

UserModel = get_user_model()


class RegisterUserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        fields = ['email', 'password1', 'password2']

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


class LoginUserForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].label = False
        self.fields['password'].label = False

        self.fields['username'].widget.attrs['placeholder'] = \
            'Enter your email'

        self.fields['password'].widget.attrs['placeholder'] = \
            'Enter your password'
