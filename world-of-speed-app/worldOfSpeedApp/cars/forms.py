from django import forms

from worldOfSpeedApp.cars.models import Car

from worldOfSpeedApp.core.mixins import DisableFieldsMixin


class CarBaseForm(forms.ModelForm):
    class Meta:
        model = Car
        exclude = ['owner',]

        widgets = {
            'image_url': forms.URLInput(attrs={'placeholder': 'https://...'})
        }

        labels = {
            'image_url': 'Image URL'
        }


class CarCreateForm(CarBaseForm):
    pass


class CarUpdateForm(CarBaseForm):
    pass


class CarDeleteForm(DisableFieldsMixin, CarBaseForm):
    pass
