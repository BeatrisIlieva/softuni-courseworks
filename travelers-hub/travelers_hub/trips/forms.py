from django import forms

from travelers_hub.trips.models import Trip
from travelers_hub.core.mixins import AddPlaceholdersMixin, DisableFieldsMixin


class TripBaseForm(AddPlaceholdersMixin, forms.ModelForm):
    placeholders = {
        'destination': 'Enter a short destination note...',
        'summary': 'Share your exciting moments...',
        'duration': '*Duration in days is expected.',
        'image_url': 'An optional image URL...',
    }

    class Meta:
        model = Trip
        exclude = ['traveler']

        widgets = {
            'start_date': forms.TextInput(attrs={'type': 'date'})
        }


class TripCreateForm(TripBaseForm):
    pass


class TripUpdateForm(TripBaseForm):
    pass


class TripDeleteForm(DisableFieldsMixin, TripBaseForm):
    pass
