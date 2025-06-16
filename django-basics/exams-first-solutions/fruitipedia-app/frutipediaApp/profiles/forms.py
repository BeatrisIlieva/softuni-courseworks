from django import forms

from frutipediaApp.profiles.models import Profile
from frutipediaApp.core.mixins import AddPlaceholderMixin, RemoveLabelMixin


class ProfileCreateForm(AddPlaceholderMixin, RemoveLabelMixin, forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'email', 'password']

        widgets = {
            'password': forms.PasswordInput(),
        }
        
class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile 
        fields = ['first_name', 'last_name', 'image_url', 'age']