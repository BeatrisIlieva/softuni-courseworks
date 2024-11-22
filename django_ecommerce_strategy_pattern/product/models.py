from django.db import models


class Description(models.Model):

    content = models.TextField()


class Product(models.Model):
    
    CATEGORY_CHOICES = (
        ("E", "Earrings"),
        ("B", "Bracelets"),
        ("N", "Necklaces"),
        ("R", "Rings"),
    )

    category = models.CharField(
        max_length=15,
        choices=CATEGORY_CHOICES,
    )
    
    COLOR_CHOICES = (
        ("P", "Pink"),
        ("B", "Blue"),
        ("W", "White"),
    )

    color = models.CharField(
        max_length=10,
        choices=COLOR_CHOICES,
    )

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    quantity = models.PositiveIntegerField()

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
    
    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )


class Earring(BaseProduct):

    SIZE_CHOICES = (
        (4.05, 4.05),
        (4.98, 4.98),
        (5.86, 5.86),
    )

    PRICE_CHOICES = (
        (43_000.00, 43_000.00),
        (44_000.00, 44_000.00),
        (45_000.00, 45_000.00),
    )

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        choices=SIZE_CHOICES,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        choices=PRICE_CHOICES,
    )


class Bracelet(BaseProduct):

    SIZE_CHOICES = (
        (15.02, 15.02),
        (17.08, 17.08),
        (19.03, 19.03),
    )

    PRICE_CHOICES = (
        (34_000.00, 34_000.00),
        (35_000.00, 35_000.00),
        (36_000.00, 36_000.00),
    )

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        choices=SIZE_CHOICES,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        choices=PRICE_CHOICES,
    )


class Necklace(BaseProduct):

    SIZE_CHOICES = (
        (40.64, 40.64),
        (43.18, 43.18),
        (45.72, 45.72),
    )

    PRICE_CHOICES = (
        (55_000.00, 55_000.00),
        (56_000.00, 56_000.00),
        (57_000.00, 57_000.00),
    )

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        choices=SIZE_CHOICES,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        choices=PRICE_CHOICES,
    )


class Ring(BaseProduct):

    SIZE_CHOICES = (
        (4.07, 4.07),
        (4.09, 4.09),
        (5.05, 5.05),
    )

    PRICE_CHOICES = (
        (23_000.00, 23_000.00),
        (24_000.00, 24_000.00),
        (25_000.00, 25_000.00),
    )

    size = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        choices=SIZE_CHOICES,
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        choices=PRICE_CHOICES,
    )
