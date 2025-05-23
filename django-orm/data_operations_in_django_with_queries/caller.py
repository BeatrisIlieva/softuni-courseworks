import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from decimal import Decimal

from django.db.models import F, Case, When, Value, Q

from main_app.models import Pet, Artifact, Location, Car, Task, HotelRoom, Character


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
    Artifact.objects.filter(is_magical=True, age__gt=250, pk=artifact.pk).update(
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


def show_unfinished_tasks():
    tasks = Task.objects.filter(is_finished=False)

    return "\n".join(
        [f"Task - {x.title} needs to be done until {x.due_date}!" for x in tasks]
    )


def complete_odd_tasks():
    tasks = Task.objects.all()

    for task in tasks:
        if task.pk % 2 != 0:
            task.is_finished = True

    Task.objects.bulk_update(tasks, ["is_finished"])


def encode_and_replace(text: str, task_title: str):
    tasks = Task.objects.filter(title=task_title)

    for task in tasks:
        task.description = "".join([chr(ord(char) - 3) for char in text])

    Task.objects.bulk_update(tasks, ["description"])


def get_deluxe_rooms():
    rooms = HotelRoom.objects.filter(room_type="Deluxe")

    even_rooms = [x for x in rooms if x.pk % 2 == 0]

    return "\n".join(
        [
            f"Deluxe room with number {r.room_number} costs {r.price_per_night}$ per night!"
            for r in even_rooms
        ]
    )


def increase_room_capacity():
    rooms = HotelRoom.objects.all().order_by("pk")

    previous_room_capacity = 0

    for room in rooms:
        if room.is_reserved:
            if previous_room_capacity > 0:
                room.capacity += previous_room_capacity
            else:
                room.capacity += room.pk

        previous_room_capacity = room.capacity

    HotelRoom.objects.bulk_update(rooms, ["capacity"])


def reserve_first_room():
    room = HotelRoom.objects.first()

    room.is_reserved = True

    room.save()


def delete_last_room():
    room = HotelRoom.objects.last()

    if not room.is_reserved:
        room.delete()


def update_characters():
    Character.objects.filter(class_name="Mage").update(
        level=F("level") + 3, intelligence=F("intelligence") - 7
    )

    Character.objects.filter(class_name="Warrior").update(
        hit_points=F("hit_points") / 2, dexterity=F("dexterity") + 4
    )

    Character.objects.filter(Q(class_name="Assassin") | Q(class_name="Scout")).update(
        inventory="The inventory is empty"
    )


def fuse_characters(first_character: Character, second_character: Character):
    Character.objects.create(
        name=first_character.name + " " + second_character.name,
        class_name="Fusion",
        level=abs(int(first_character.level + second_character.level // 2)),
        strength=abs(int(first_character.strength + second_character.strength * 1.2)),
        dexterity=abs(
            int(first_character.dexterity + second_character.dexterity * 1.4)
        ),
        intelligence=abs(
            int(first_character.intelligence + second_character.intelligence * 1.5)
        ),
        hit_points=first_character.hit_points + second_character.hit_points,
        inventory=Case(
            When(
                Q(first_character__class_name="Mage")
                    | 
                Q(first_character__class_name="Scout"),
                then=Value("Bow of the Elven Lords, Amulet of Eternal Wisdom"),
            ),
            When(
                Q(first_character__class_name="Warrior")
                    |
                Q(first_character__class_name="Assassin"),
                then=Value("Dragon Scale Armor, Excalibur")
            )
        ),
    )
    
    first_character.delete()
    second_character.delete()

first_character = Character.objects.get(pk=1)
second_character= Character.objects.get(pk=2)

fuse_characters(first_character, second_character)
# Character.objects.create(name="name2", class_name="Assassin", level=1, strength=50, dexterity=50, intelligence=50, hit_points=50, inventory="inventory")


