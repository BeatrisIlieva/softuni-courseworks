from django.core.validators import MinLengthValidator
from django.db import models


class Post(models.Model):
    TITLE_MAX_LENGTH = 50
    TITLE_MIN_LENGTH = 5
    TITLE_UNIQUE_ERROR_MESSAGE = (
        'Oops! That title is already taken.'
        'How about something fresh and fun?'
    )

    IMAGE_URL_HELP_TEXT = 'Share your funniest furry photo URL!'

    title = models.CharField(
        max_length=TITLE_MAX_LENGTH,
        validators=[
            MinLengthValidator(
                TITLE_MIN_LENGTH,
            ),
        ],
        unique=True,
        error_messages={
            'unique': TITLE_UNIQUE_ERROR_MESSAGE,
        },
    )

    image_url = models.URLField(
        help_text=IMAGE_URL_HELP_TEXT,
    )

    content = models.TextField()

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    author = models.ForeignKey(
        to='authors.Author',
        on_delete=models.CASCADE,
    )
