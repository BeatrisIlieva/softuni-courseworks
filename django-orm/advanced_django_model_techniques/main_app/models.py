from django.db import models
from main_app.validators import validate_name
from django.core.validators import MinValueValidator, RegexValidator, MinLengthValidator
from decimal import Decimal


class Customer(models.Model):
    name = models.CharField(
        max_length=100,
        validators=[
            validate_name,
        ],
    )

    age = models.PositiveBigIntegerField(
        validators=[
            MinValueValidator(18, message="Age must be greater than or equal to 18")
        ],
    )

    email = models.EmailField(error_messages={"invalid": "Enter a valid email address"})

    phone_number = models.CharField(
        max_length=13,
        validators=[
            RegexValidator(
                regex="\+359\d{9}",
                message="Phone number must start with '+359' followed by 9 digits",
            )
        ],
    )

    website_url = models.URLField(error_messages={"invalid": "Enter a valid URL"})


class BaseMedia(models.Model):
    class Meta:
        abstract = True
        ordering = ["-created_at", "title"]

    title = models.CharField(
        max_length=100,
    )

    description = models.TextField()

    genre = models.CharField(
        max_length=50,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class Book(BaseMedia):
    class Meta(BaseMedia.Meta):
        verbose_name = "Model Book"
        verbose_name_plural = "Models of type - Book"

    author = models.CharField(
        max_length=100,
        validators=[
            MinLengthValidator(5, message="Author must be at least 5 characters long"),
        ],
    )

    isbn = models.CharField(
        max_length=20,
        unique=True,
        validators=[
            MinLengthValidator(6, message="ISBN must be at least 6 characters long")
        ],
    )


class Movie(BaseMedia):
    class Meta(BaseMedia.Meta):
        verbose_name = "Model Movie"
        verbose_name_plural = "Models of type - Movie"

    director = models.CharField(
        max_length=100,
        validators=[
            MinLengthValidator(8, message="Director must be at least 8 characters long")
        ],
    )


class Music(BaseMedia):
    class Meta(BaseMedia.Meta):
        verbose_name = "Model Music"
        verbose_name_plural = "Models of type - Music"

    artist = models.CharField(
        max_length=100,
        validators=[
            MinLengthValidator(9, message="Artist must be at least 9 characters long")
        ],
    )


class Product(models.Model):
    name = models.CharField(
        max_length=100,
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    def calculate_tax(self):
        return self.price * Decimal(0.08)

    def calculate_shipping_cost(self, weight: Decimal):
        return weight * Decimal(2.00)

    def format_product_name(self):
        return f"Product: {self.name}"


class DiscountedProduct(Product):
    class Meta:
        proxy = True

    def calculate_price_without_discount(self):
        return self.price * 1.2

    def calculate_tax(self):
        return self.price * 0.05

    def calculate_shipping_cost(self, weight: Decimal):
        return weight * Decimal(1.5)

    def format_product_name(self):
        return f"Discounted Product: {self.name}"


class RechargeEnergyMixin:
    def recharge_energy(self, amount: int):
        self.energy = min(self.energy + amount, 100)


class Hero(models.Model, RechargeEnergyMixin):
    name = models.CharField(
        max_length=100,
    )

    hero_title = models.CharField(
        max_length=100,
    )

    energy = models.PositiveIntegerField()


class SpiderHero(Hero):
    class Meta:
        proxy = True

    def swing_from_buildings(self):
        self.energy -= 80

        if self.energy < 0:
            return f"{self.name} as Spider Hero is out of web shooter fluid"

        if self.energy == 0:
            self.energy = 1

        self.save()

        return f"{self.name} as Spider Hero swings from buildings using web shooters"


class FlashHero(Hero):
    class Meta:
        proxy = True

    def run_at_super_speed(self):
        self.energy -= 65

        if self.energy < 0:
            return f"{self.name} as Flash Hero needs to recharge the speed force"

        if self.energy == 0:
            self.energy = 1

        self.save()

        return f"{self.name} as Flash Hero runs at lightning speed, saving the day"
