from django import forms
from django.core.exceptions import ValidationError

from django import forms
import calendar

from forumApp.posts.mixins import DisableFieldsMixin
from forumApp.posts.models import Comment, Post


class PostBaseFrom(forms.ModelForm):

    class Meta:
        model = Post
        fields = '__all__'

        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Enter a name'}),
        }

        labels = {
            'title': 'Enter unique title'
        }

        error_messages = {
            'title': {
                'required': 'Please enter a value',
                'max_length': f'First name cannot exceed {Post.TITLE_MAX_LENGTH} letters'
            }

        }

    def clean_author(self):
        author = self.cleaned_data.get('author')

        if not author[0] == author[0].upper():
            raise ValidationError(
                'The name should start with a capital letter')

        return author

    def clean(self):
        cleaned_data = super().clean()

        name = cleaned_data.get('title')
        content = cleaned_data.get('content')

        if name and content and name in content:
            raise ValidationError('Content cannot include name')

        return cleaned_data

    def save(self, commit=True):
        post = super().save(commit=False)

        post.title = post.title.capitalize()

        if commit:
            post.save()

        return post


class PostCreateForm(PostBaseFrom):
    pass


class PostEditForm(PostBaseFrom):
    pass


class PostDeleteForm(PostBaseFrom, DisableFieldsMixin):
    disabled_fields = ('title', 'content')
    pass


class SearchForm(forms.Form):

    query = forms.CharField(
        label='',
        required=True,
        error_messages={
            'required': 'Please write something',
            'max_length': 'The field cannot be more than 5 letters',
        },
        max_length=100,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Search,'
            }
        )
    )


MONTH_CHOICES = [(i, calendar.month_name[i]) for i in range(1, 13)]


class PersonForm(forms.Form):
    STATUS_CHOICES = (
        ('ARCHIVED', 'ARCHIVED'),
        ('NEW', 'NEW'),
        ('UPCOMING', 'UPCOMING')
    )
    person_name = forms.CharField(
        max_length=5,
        widget=forms.TextInput(attrs={'placeholder': 'Enter a name'}),
        error_messages={
            'required': 'Please enter a value',
            'max_length': 'First name cannot exceed 5 letters'
        }
    )

    age = forms.IntegerField()

    month = forms.ChoiceField(
        label='MM*',
        choices=MONTH_CHOICES,
    )

    agree_with_terms = forms.BooleanField()

    radio_choices = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=STATUS_CHOICES,
    )

    # select_choices = forms.ChoiceField(
    #     widget=forms.CheckboxSelectMultiple,
    #     choices=STATUS_CHOICES,
    # )

    select_choices = forms.MultipleChoiceField(
        widget=forms.CheckboxSelectMultiple,
        choices=STATUS_CHOICES,
    )


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('author', 'content')

        labels = {
            'author': '',
            'content': ''
        }

        error_message = {
            'author': {
                'required': 'Please enter an aurhor name'
            },
            'content': {
                'Please enter content'
            }
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['author'].widget.attrs.update({
            'placeholder': 'Your name',
        })

        self.fields['content'].widget.attrs.update({
            'placeholder': 'Content...',
        })
        
        
CommentFormSet = forms.formset_factory(CommentForm, extra=3)
