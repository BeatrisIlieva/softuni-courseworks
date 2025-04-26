from django import forms

from furry_funnies.posts.models import Post
from furry_funnies.core.mixins import (
    AddPlaceholderMixin,
    CapitalizeLabelsWordsMixin,
    DisableFieldsMixin
)


class PostBaseForm(
    AddPlaceholderMixin,
    CapitalizeLabelsWordsMixin,
    forms.ModelForm
):
    placeholders = {
        'title': 'Put an attractive and unique title...',
        'content': 'Share some interesting facts about your adorable pets...',
    }

    class Meta:
        model = Post
        exclude = ['author', 'updated_at',]


class PostCreateForm(PostBaseForm):
    pass


class PostUpdateForm(PostBaseForm):
    pass


class PostDeleteForm(DisableFieldsMixin, PostBaseForm):
    pass
