from django.core.validators import MinLengthValidator
from django.db import models


class Trip(models.Model):
    DESTINATION_MAX_LENGTH = 100
    DESTINATION_MIN_LENGTH = 3

    DURATION_HELP_TEXT = '*Duration in days is expected.'

    destination = models.CharField(
        max_length=DESTINATION_MAX_LENGTH,
        validators=[
            MinLengthValidator(DESTINATION_MIN_LENGTH),
        ],
    )

    summary = models.TextField()

    start_date = models.DateField()

    duration = models.PositiveSmallIntegerField(
        default=1,
        help_text=DURATION_HELP_TEXT,
    )

    image_url = models.URLField(
        null=True,
        blank=True,
    )

    traveler = models.ForeignKey(
        to='travelers.Traveler',
        on_delete=models.CASCADE,
    )
