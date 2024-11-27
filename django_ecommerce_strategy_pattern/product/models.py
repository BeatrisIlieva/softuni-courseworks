from abc import ABC, abstractmethod

from django.db import models

# from django_ecommerce_strategy_pattern.product.managers import ProductManager


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


class ProductAbstractFactory(ABC):
    @staticmethod
    @abstractmethod
    def create_earring():
        pass

    @staticmethod
    @abstractmethod
    def create_bracelet():
        pass
    
    @staticmethod
    @abstractmethod
    def create_necklace():
        pass

    @staticmethod
    @abstractmethod
    def create_ring():
        pass


class BaseProduct(models.Model):
    class Meta:
        abstract = True

    # objects = ProductManager()

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    description = models.TextField(
        max_length=300,
    )

    color = models.ForeignKey(
        to=Color,
        on_delete=models.CASCADE,
        # related_name="color",
    )


class Earring(BaseProduct):
    DROP_LENGTH_CHOICES = (
        ("S", 4.05),
        ("M", 4.98),
        ("L", 5.86),
    )

    drop_length = models.CharField(
        max_length=1,
        choices=DROP_LENGTH_CHOICES,
    )


class Bracelet(BaseProduct):
    WRIST_SIZE_CHOICES = (
        ("S", 15.02),
        ("M", 17.08),
        ("L", 19.03),
    )

    wrist_size = models.CharField(
        max_length=1,
        choices=WRIST_SIZE_CHOICES,
    )


class Necklace(BaseProduct):
    NECKLINE_CHOICES = (
        ("S", 40.64),
        ("M", 43.18),
        ("L", 45.72),
    )

    neckline_length = models.CharField(
        max_length=1,
        choices=NECKLINE_CHOICES,
    )


class Ring(BaseProduct):
    FINGER_CIRCUMFERENCE_CHOICES = (
        ("S", 4.07),
        ("M", 4.09),
        ("L", 5.05),
    )

    finger_circumference = models.CharField(
        max_length=1,
        choices=FINGER_CIRCUMFERENCE_CHOICES,
    )


class PinkFactory(ProductAbstractFactory):
    PINK_COLOR_DB_TITLE = Color.TITLE_CHOICES[0][0]
    
    def create_earring(
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Earring:

        for choice in Earring.DROP_LENGTH_CHOICES:
            measurement = choice[0]

            return Earring.objects.create(
                first_image_url=first_image_url,
                second_image_url=second_image_url,
                color=Color.objects.get(title=PinkFactory.PINK_COLOR_DB_TITLE),
                description=description,
                drop_length=measurement,
            )

    def create_bracelet(
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Bracelet:

        for choice in Bracelet.WRIST_SIZE_CHOICES:
            measurement = choice[0]

            return Bracelet.objects.create(
                first_image_url=first_image_url,
                second_image_url=second_image_url,
                color=Color.objects.get(title=PinkFactory.PINK_COLOR_DB_TITLE),
                description=description,
                wrist_size=measurement,
            )

    def create_necklace(
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Necklace:

        for choice in Necklace.NECKLINE_CHOICES:
            measurement = choice[0]

            return Necklace.objects.create(
                first_image_url=first_image_url,
                second_image_url=second_image_url,
                color=Color.objects.get(title=PinkFactory.PINK_COLOR_DB_TITLE),
                description=description,
                neckline_length=measurement,
            )

    def create_ring(
        first_image_url: str,
        second_image_url: str,
        description: str,
    ) -> Ring:

        for choice in Ring.FINGER_CIRCUMFERENCE_CHOICES:
            measurement = choice[0]

            return Ring.objects.create(
                first_image_url=first_image_url,
                second_image_url=second_image_url,
                color=Color.objects.get(title=PinkFactory.PINK_COLOR_DB_TITLE),
                description=description,
                finger_circumference=measurement,
            )
