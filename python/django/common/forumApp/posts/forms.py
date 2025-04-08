from django import forms

from forumApp.posts.models import Post
from forumApp.posts.mixins import DisableFieldMixin
from django.core.exceptions import ValidationError


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'
        # exclude = ['title',]
        
        error_messages = {
            'title': {  
                'required': 'Please enter a title',
                'max_length': f'The title is too long. It should be less than {Post.TITLE_MAX_LENGTH}',
            }
        }

    def clean_author(self):
        author = self.cleaned_data.get('author')
        
        if author[0] != author[0].upper():
            raise ValidationError('Author name should start with capital letter')
        
        return author
        
    def clean(self):
        cleaned_data = super().clean()
        
        title = cleaned_data.get('title')
        content = cleaned_data.get('content')
        
        if title and content and title in content:
            raise ValidationError('The post title cannot be included in the post content')
        
        return cleaned_data
    
    def save(self, commit=True):
        post = super().save(commit=True)
        
        post.title = post.title.capitalize()
        
        if commit:
            post.save()
            
        return post

        # widgets = {
        #     'title': forms.NumberInput,
        # }

        # labels = {
        #     'title': 'The title should be a digit'
        # }

        # error_messages = {
        #     'title': 'There is an error'
        # }

        # help_texts = {
        #     'title': 'Enter a digit'
        # }
        


class PostCreateForm(PostForm):
    pass


class PostEditForm(PostForm):
    pass


class PostDeleteForm(PostForm, DisableFieldMixin):
    disabled_fields = ('__all__',)
    # disabled_fields = ('title',)



class SearchForm(forms.Form):
    query = forms.CharField(
        label='',
        required=False,
        max_length=100,
        # error_messages= {
        #     'required': 'Please write something',
        #     'max_length': 'The max length is 10 chars',
        #     },
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Search for a post'
            }
        )
    )
