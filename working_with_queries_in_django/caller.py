import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from typing import List

from django.db.models import Q, F, Value, When, Case

from main_app.models import ArtworkGallery, Laptop


def show_highest_rated_art():
    art = ArtworkGallery.objects.all().order_by("-rating", "id").first()

    return f"{art.art_name} is the highest-rated art with a {art.rating} rating!"


def bulk_create_arts(first_art: ArtworkGallery, second_art: ArtworkGallery):
    ArtworkGallery.objects.bulk_create([first_art, second_art])


def delete_negative_rated_arts():
    ArtworkGallery.objects.filter(rating__lt=0).delete()


def show_the_most_expensive_laptop():
    laptop = Laptop.objects.order_by("-price", "-id").first()

    return f"{laptop.brand} is the most expensive laptop available for {laptop.price}$!"


def bulk_create_laptops(args: List[Laptop]):
    Laptop.objects.bulk_create(args)


def update_to_512_GB_storage():
    Laptop.objects.filter(Q(brand="Asus") | Q(brand="Lenovo")).update(storage=512)


def update_to_16_GB_memory():
    Laptop.objects.filter(Q(brand="Apple") | Q(brand="Dell") | Q(brand="Acer")).update(
        memory=16
    )


def update_operation_systems():
    Laptop.objects.update(
        operation_system=Case(
            When(brand="Asus", then=Value("Windows")),
            When(brand="Apple", then=Value("MacOS")),
            When(Q(brand="Dell") | Q(brand="Acer"), then=Value("Linux")),
            When(brand="Lenovo", then=Value("Chrome OS")),
            default=F("operation_system"),
        )
    )


def delete_inexpensive_laptops():
    Laptop.objects.filter(price__lt=1200).delete()
