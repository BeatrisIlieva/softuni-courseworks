from django import forms

from forumApp.posts.models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'
        # exclude = ['title',]

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


class PostDeleteForm(PostForm):
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
                'placeholder': 'Search for a post'
            }
        )
    )
