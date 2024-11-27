class Description(models.Model):
    content = models.TextField(
        max_length=300,
    )
