from django.db import models

from django_ecommerce_strategy_pattern.product.strategies import ProductContext


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
    content = models.TextField()


class Product(models.Model):

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    quantity = models.PositiveIntegerField()

    description = models.ForeignKey(
        to=Description,
        on_delete=models.CASCADE,
        related_name="description",
    )

    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name="category",
    )

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
        related_name="color",
        # related_name="%(class)s_color",
    )

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        choices=[],
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        choices=[],
    )
    
    @property
    def is_sold_out(self):
        return self.quantity <= 0

    def save(self, *args, **kwargs):

        context = ProductContext(self)
        context.set_strategies()

        super().save(*args, **kwargs)
