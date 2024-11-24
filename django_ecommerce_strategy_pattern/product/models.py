from django.db import models

from django_ecommerce_strategy_pattern.product.managers import ProductManager


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


class Description(models.Model):
    content = models.TextField(
        max_length=300,
    )


class Product(models.Model):
    class Meta:
        unique_together = ("category", "color")

    objects = ProductManager()

    first_image_url = models.URLField()

    second_image_url = models.URLField()

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

    description = models.ForeignKey(
        to=Description,
        on_delete=models.CASCADE,
        related_name="description",
    )
