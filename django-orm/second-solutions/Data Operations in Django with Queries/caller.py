import os
import django

from typing import QuerySet

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from main_app.models import Pet, Artifact, Location, Car


def create_pet(name: str, species: str):
    pet = Pet.objects.create(name=name, species=species)

    return f'{pet.name} is a very cute {pet.species}!'

# print(create_pet('Daisy', 'cat'))


def create_artifact(name: str, origin: str, age: int, description: str, is_magical: bool):
    artifact = Artifact.objects.create(name=name, origin=origin, age=age,
                                       description=description, is_magical=is_magical)

    return f'The artifact {artifact.name} is {artifact.age} years old!'


def rename_artifact(artifact: Artifact, new_name: str):
    if artifact.is_magical == True and artifact.age > 250:
        artifact.name = new_name
        artifact.save()


def delete_all_artifacts():
    Artifact.objects.all().delete()


# print(create_artifact('Name', 'origin', 251, 'desc', True))
# print(create_artifact('Name', 'origin', 251, 'desc', False))
# print(create_artifact('Name', 'origin', 250, 'desc', True))

# artifact = Artifact.objects.get(pk=1)
# rename_artifact(artifact=artifact, new_name='2')

# delete_all_artifacts()

# Location.objects.create(
#     name='Sofia',
#     region='Sofia Region',
#     population=7000000,
#     description='kdfjkjhdfjhsf',
#     is_capital=True
# )

# Location.objects.create(
#     name='Plovdiv',
#     region='Plovdiv Region',
#     population=7000000,
#     description='kdfjkjhdfjhsf',
#     is_capital=False
# )

def show_all_locations():
    locations = Location.objects.all().order_by('-pk')

    for location in locations:
        print(f'{location.name} has a population of {location.population}!')


def new_capital():
    # location = Location.objects.first()
    Location.objects.filter(pk=1).update(is_capital=True)

# new_capital()


def get_capitals():
    return Location.objects.filter(is_capital=True).values_list('name', flat=True)


def delete_first_location():
    Location.objects.first().delete()

# delete_first_location()


def apply_discount():
    Car.objects.update(price_with_discount=4000)
    
def get_recent_cars() -> QuerySet[dict]:
    return Car.objects.filter(year__gt=2020).values('model', 'price')

def delete_last_car():
    Car.objects.last().delete()

# Car.objects.create(
#     model='model',
#     year=2021,
#     color='color',
#     price=2000
# )

# apply_discount()

# print(get_recent_cars())

delete_last_car()