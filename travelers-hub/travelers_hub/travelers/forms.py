from django import forms

from travelers_hub.core.mixins import AddPlaceholdersMixin
from travelers_hub.travelers.models import Traveler


class TravelerBaseForm(AddPlaceholdersMixin, forms.ModelForm):
    placeholders = {
        'nickname': 'Enter a unique nickname...',
        'email': 'Enter a valid email address...',
        'country': 'Enter a country code like <BGR>...',
    }


class TravelerCreateForm(TravelerBaseForm):

    class Meta:
        model = Traveler
        fields = [
            'nickname',
            'email',
            'country',
        ]


class TravelerUpdateForm(TravelerBaseForm):
    class Meta:
        model = Traveler
        fields = '__all__'


class TravelerDelete(TravelerBaseForm):
    pass
