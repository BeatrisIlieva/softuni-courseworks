from django import forms

from petstagram.photos.models import Photo


class BasePhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = '__all__'


class AddPhotoForm(BasePhotoForm):
    pass


class PhotoEditForm(forms.ModelForm):
    class Meta:
        model = Photo
        exclude = ['photo']

        

    
    
