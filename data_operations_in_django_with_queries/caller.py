import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from decimal import Decimal

from main_app.models import Pet, Artifact, Location, Car


def create_pet(name: str, species: str):
    pet = Pet.objects.create(name=name, species=species)

    return f"{pet.name} is a very cute {pet.species}!"


def create_artifact(
    name: str, origin: str, age: int, description: str, is_magical: bool
):
    artifact = Artifact.objects.create(
        name=name,
        origin=origin,
        age=age,
        description=description,
        is_magical=is_magical,
    )

    return f"The artifact {artifact.name} is {artifact.age} years old!"


def rename_artifact(artifact: Artifact, new_name: str):

    Artifact.objects.filter(pk=artifact.pk, is_magical=True, age__gt=250).update(
        name=new_name
    )


def delete_all_artifacts():
    Artifact.objects.all().delete()


def show_all_locations():
    locations = Location.objects.all().order_by("-id")

    return "\n".join(
        [f"{x.name} has a population of {x.population}!" for x in locations]
    )


def new_capital():

    location = Location.objects.all().order_by("id").first()

    if location:
        location.is_capital = True
        location.save()


def get_capitals():
    return Location.objects.filter(is_capital=True).values("name")


def delete_first_location():
    location = Location.objects.all().order_by("id").first()

    if location:
        location.delete()


def apply_discount():
    all_cars = Car.objects.all()

    updated_cars = []

    for car in all_cars:
        year = str(car.year)
        discount = sum(int(d) for d in year)

        discount_percentage = car.price * Decimal(discount / 100)

        car.price_with_discount = Decimal(car.price - discount_percentage)

        updated_cars.append(car)

    Car.objects.bulk_update(updated_cars, ["price_with_discount"])


def get_recent_cars():
    return Car.objects.filter(year__gt=2020).values("model", "price_with_discount")


def delete_last_car():
    Car.objects.last().delete()
