from django.db import models

from main_app.choices import StatusChoices


class Shoe(models.Model):
    brand = models.CharField(
        max_length=25,
    )

    size = models.PositiveIntegerField()

# python manage.py makemigrations main_app --name migrate_unique_brands --empty


class UniqueBrands(models.Model):
    brand = models.CharField(
        max_length=25,
    )


class EventRegistration(models.Model):
    event_name = models.CharField(
        max_length=60,
    )

    participant_name = models.CharField(
        max_length=50,
    )

    registration_date = models.DateField()

    def __str__(self):
        return f'{self.participant_name} - {self.event_name}'


class Movie(models.Model):
    title = models.CharField(
        max_length=100,
    )

    director = models.CharField(
        max_length=100,
    )

    release_year = models.PositiveIntegerField()

    genre = models.CharField(
        max_length=50,
    )

    def __str__(self):
        return f'Movie "{self.title}" by {self.director}'


class Student(models.Model):
    first_name = models.CharField(
        max_length=50,
    )

    last_name = models.CharField(
        max_length=50,
    )

    age = models.PositiveIntegerField()

    grade = models.CharField(
        max_length=10,
    )

    date_of_birth = models.DateField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Person(models.Model):
    name = models.CharField(
        max_length=40,
    )

    age = models.PositiveIntegerField()

    age_group = models.CharField(
        max_length=20,
        default='"No age group'
    )

    def __str__(self):
        return f'Name: {self.name}'

    #  python manage.py makemigrations main_app --name migrate_age_group --empty


class Order(models.Model):
    product_name = models.CharField(
        max_length=30,
    )

    customer_name = models.CharField(
        max_length=100,
    )

    order_date = models.DateField()

    status = models.CharField(
        max_length=30,
        choices=StatusChoices
    )

    amount = models.PositiveIntegerField(
        default=1,
    )

    product_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    warranty = models.CharField(
        default='No warranty',
    )

    delivery = models.DateField(
        null=True,
        blank=True,
    )
    
    # python manage.py makemigrations main_app --name migrate_delivery_and_warranty --empty
