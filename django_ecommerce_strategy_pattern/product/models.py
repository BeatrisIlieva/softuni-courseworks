from django.db import models


class EarringSize(models.Model):
    MEASUREMENT_CHOICES = (
        (4.05, 4.05),
        (4.98, 4.98),
        (5.86, 5.86),
    )

    measurement = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        choices=MEASUREMENT_CHOICES,
    )


class BraceletSize(models.Model):
    pass


class NecklaceSize(models.Model):
    pass


class RingSize(models.Model):
    pass


class BasePrice(models.Model):

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
    )


class EarringPrice(BasePrice):
    pass


class BraceletPrice(BasePrice):
    pass


class NecklacePrice(BasePrice):
    pass


class RingPrice(BasePrice):
    pass


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

    description = models.TextField()

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    quantity = models.PositiveIntegerField()


class Earring(BaseProduct):
    size = models.ForeignKey(
        to=EarringSize,
        on_delete=models.CASCADE,
        related_name="earring_size",
    )

    price = models.ForeignKey(
        to=EarringPrice,
        on_delete=models.CASCADE,
        related_name="earring_price",
    )


class Bracelet(BaseProduct):
    size = models.ForeignKey(
        to=BraceletSize,
        on_delete=models.CASCADE,
        related_name="bracelet_size",
    )

    price = models.ForeignKey(
        to=BraceletPrice,
        on_delete=models.CASCADE,
        related_name="bracelet_price",
    )


class Necklace(BaseProduct):
    size = models.ForeignKey(
        to=NecklaceSize,
        on_delete=models.CASCADE,
        related_name="necklace_size",
    )

    price = models.ForeignKey(
        to=NecklacePrice,
        on_delete=models.CASCADE,
        related_name="necklace_price",
    )


class Ring(BaseProduct):
    size = models.ForeignKey(
        to=RingSize,
        on_delete=models.CASCADE,
        related_name="ring_size",
    )

    price = models.ForeignKey(
        to=RingPrice,
        on_delete=models.CASCADE,
        related_name="ring_price",
    )
