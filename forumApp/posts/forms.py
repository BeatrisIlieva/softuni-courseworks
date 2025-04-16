from django import forms

from django import forms
import calendar

from forumApp.posts.models import Post


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
                'max_length': 'First name cannot exceed 5 letters'
            }

        }


class PostCreateForm(PostBaseFrom):
    pass


class PostEditForm(PostBaseFrom):
    pass


class PostDeleteForm(PostBaseFrom):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        for field in self.fields:
            self.fields[field].disabled = True
            

class SearchForm(forms.Form):

    query = forms.CharField(
        label='',
        required=False,
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
