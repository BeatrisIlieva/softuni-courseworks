from django.db import models

from django_ecommerce_strategy_pattern.product.managers import (
    ProductManager,
)


class Category(models.Model):
    TITLE_CHOICES = (
        ("E", "Earrings"),
        ("B", "Bracelets"),
        ("N", "Necklaces"),
        ("R", "Rings"),
    )

    title = models.CharField(
        max_length=1,
        choices=TITLE_CHOICES,
    )

    def __str__(self):
        return self.get_title_display()


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
        return self.get_title_display()


class Product(models.Model):

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

    description = models.TextField(
        max_length=300,
    )

    def __str__(self):
        return f"{self.color.get_title_display()} {self.category.get_title_display()}"
