from django import forms

from petstagram.pets.models import Pet


class PetBaseForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ['name', 'date_of_birth', 'personal_photo']

        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Enter a pet name'}),
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
            'personal_photo': forms.TextInput(attrs={'placeholder': 'Link to image'})
        }

        labels = {
            'name': 'Enter a pet name',
            'date_of_birth': 'Enter a date of birth',
            'personal_photo': 'Enter a pet photo',
        }


class PetAddForm(PetBaseForm):
    pass


class PetEditForm(PetBaseForm):
    pass

class PetDeleteForm(PetBaseForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['disabled'] = 'disabled'
