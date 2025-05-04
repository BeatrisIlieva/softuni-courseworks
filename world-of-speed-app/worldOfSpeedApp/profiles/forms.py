from django import forms

from worldOfSpeedApp.profiles.models import Profile


class ProfileCreateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['username', 'email', 'age', 'password']

        widgets = {
            'password': forms.PasswordInput(),
        }


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'