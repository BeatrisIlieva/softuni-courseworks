from django.db import models


class Size(models.Model):
    measurement = models.DecimalField(
        max_digits=6,
        decimal_places=2,
    )


class Category(models.Model):
    TITLE_CHOICES = (
        ("E", "Earrings"),
        ("B", "Bracelets"),
        ("N", "Necklaces"),
        ("R", "Rings"),
    )

    title = models.CharField(
        max_length=15,
        choices=TITLE_CHOICES,
    )

    size = models.ManyToManyField(
        to=Size,
        through="CategorySize",
    )


class CategorySize(models.Model):
    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name="categories",
    )

    size = models.ForeignKey(
        to=Size,
        on_delete=models.CASCADE,
        related_name="sizes",
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )


class Color(models.Model):
    TITLE_CHOICES = (
        ("P", "Pink"),
        ("B", "Blue"),
        ("W", "White"),
    )

    title = models.CharField(
        max_length=10,
        choices=TITLE_CHOICES,
    )


class BaseProduct(models.Model):
    class Meta:
        abstract = True

    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name="category",
    )

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
        related_name="color",
    )
