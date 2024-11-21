from django.db import models


class Category(models.Model):
    TITLE_CHOICES = (
        ("B", "Bracelets"),
        ("E", "Earrings"),
        ("N", "Necklaces"),
        ("R", "Rings"),
    )

    title = models.CharField(
        max_length=15,
        choices=TITLE_CHOICES,
    )


class BaseProduct(models.Model):
    class Meta:
        abstract = True
        
    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name="category"
    )
