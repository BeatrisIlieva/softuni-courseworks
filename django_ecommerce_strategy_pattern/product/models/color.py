class Color(models.Model):
    TITLE_CHOICES = (
        ("P", "Pink"),
        ("B", "Blue"),
        ("W", "White"),
    )

    title = models.CharField(
        max_length=1,
        choices=TITLE_CHOICES,
    )

    def __str__(self):
        return self.title
