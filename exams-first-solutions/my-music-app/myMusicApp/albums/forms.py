from django import forms

from myMusicApp.albums.models import Album
from myMusicApp.core.mixins import PlaceHolderMixin, ReadOnlyMixin


class BaseAlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        exclude = ('owner',)

        # widgets = {
        #     'album_name': forms.TextInput(attrs={
        #         'placeholder': 'Album Name'
        #     }),
        #     'artist': forms.TextInput(attrs={
        #         'placeholder': 'Artist'
        #     }),
        #     'description': forms.Textarea(attrs={
        #         'placeholder': 'Description'
        #     }),
        #     'image_url': forms.URLInput(attrs={
        #         'placeholder': 'Image URL'
        #     }),
        #     'price': forms.NumberInput(attrs={
        #         'placeholder': 'Price'
        #     }),
        # }

        # labels = {
        #     'album_name': 'Album Name',
        #     'artist': 'Artist',
        #     'description': 'Description',
        #     'image_url': 'Image URL',
        #     'price': 'Price',
        # }


class CreateAlbumForm(PlaceHolderMixin, BaseAlbumForm):
    pass


class EditAlbumForm(PlaceHolderMixin, BaseAlbumForm):
    pass


class DeleteAlbumForm(ReadOnlyMixin, BaseAlbumForm):
    read_only_fields = ['album_name', 'artist', 'genre', 'price', 'description', 'image_url']
