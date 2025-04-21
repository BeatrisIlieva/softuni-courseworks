from django import forms

from myMusicApp.albums.models import Album


class BaseAlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = '__all__'

        widgets = {
            'album_name': forms.TextInput(attrs={
                'placeholder': 'Album Name'
            }),
            'artist': forms.TextInput(attrs={
                'placeholder': 'Artist'
            }),
            'description': forms.Textarea(attrs={
                'placeholder': 'Description'
            }),
            'image_url': forms.URLInput(attrs={
                'placeholder': 'Image URL'
            }),
            'price': forms.NumberInput(attrs={
                'placeholder': 'Price'
            }),
        }

        labels = {
            'album_name': 'Album Name',
            'artist': 'Artist',
            'description': 'Description',
            'image_url': 'Image URL',
            'price': 'Price',
        }


class CreateAlbumForm(BaseAlbumForm):
    pass


class EditAlbumForm(BaseAlbumForm):
    pass


class DeleteAlbumForm(BaseAlbumForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['disabled'] = 'disabled'
            field.widget.attrs['read-only'] = 'read-only'
