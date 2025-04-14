import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from typing import List

from django.db.models import Case, When, Value, Q
from main_app.models import ArtworkGallery, Meal, Dungeon

# Import your models
# Create and check models
# Run and print your queries

def show_highest_rated_art():
    highest_rated_art = ArtworkGallery.objects.order_by('-rating','id').first()
    
    return f'{highest_rated_art.art_name} is the highest-rated art with a {highest_rated_art.rating} rating!'


def bulk_create_arts(first_art: ArtworkGallery, second_art: ArtworkGallery):
    ArtworkGallery.objects.bulk_create([
        first_art,
        second_art
    ])


def delete_negative_rated_arts():
    ArtworkGallery.objects.filter(rating__lt=0).delete()

# artwork1 = ArtworkGallery(artist_name='Vincent van Gogh', art_name='Starry Night',rating=-1, price=1200000.0)

# artwork2 = ArtworkGallery(artist_name='Leonardo da Vinci', art_name='Mona Lisa',rating=-2, price=1500000.0)

# bulk_create_arts(artwork1, artwork2)

# print(show_highest_rated_art())

# delete_negative_rated_arts()

def set_new_chefs():
    Meal.objects.update(
        chef=Case(
            When(meal_type = 'Breakfast', then=Value('Gordon Ramsay')),
            When(meal_type='Lunch', then=Value('Julia Child')),
            When(meal_type='Dinner', then=Value('Jamie Oliver')),
            When(meal_type='Snack', then=Value('Thomas Keller'))
        )
    )
    
def set_new_preparation_times():
       Meal.objects.update(
        preparation_time=Case(
            When(meal_type = 'Breakfast', then=Value('10 minutes')),
            When(meal_type='Lunch', then=Value('12 minutes')),
            When(meal_type='Dinner', then=Value('15 minutes')),
            When(meal_type='Snack', then=Value('5 minutes'))
        )
    ) 
       
def update_low_calorie_meals():
    Meal.objects.filter(Q(meal_type='Breakfast') | Q(meal_type='Dinner')).update(calories=400)


def update_high_calorie_meals():
    Meal.objects.filter(Q(meal_type='Lunch') | Q(meal_type='Snack')).update(calories=700)
    
def delete_lunch_and_snack_meals():
    Meal.objects.filter(Q(meal_type='Snack') | Q(meal_type='Lunch')).delete()

# meal1 = Meal.objects.create(

# name="Pancakes",

# meal_type="Lunch",

# preparation_time="20 minutes",

# difficulty=3,

# calories=350,

# chef="Jane",

# )


# meal2 = Meal.objects.create(

# name="Spaghetti Bolognese",

# meal_type="Snack",

# preparation_time="45 minutes",

# difficulty=4,

# calories=550,

# chef="Sarah",

# )

# set_new_preparation_times()

# set_new_chefs()

# update_low_calorie_meals()

# update_high_calorie_meals()
# delete_lunch_and_snack_meals()


def show_hard_dungeons():
    objects = Dungeon.objects.filter(difficulty='Hard').order_by('-location')
    
    return '\n'.join(f'{dungeon.name} is guarded by {dungeon.boss_name} who has {dungeon.boss_health} health points!' for dungeon in objects)


def bulk_create_dungeons(args: List[Dungeon]):
    Dungeon.objects.bulk_create(args)
    
    
def update_dungeon_names():
    Dungeon.objects.update(name=Case(
        When(difficulty='Easy', then=Value('The Erased Thombs')),
        When(difficulty='Medium', then=Value('The Coral Labyrinth')),
        When(difficulty='Hard', then=Value('The Lost Haunt'))
    ))

def update_dungeon_bosses_health():
    Dungeon.objects.exclude(difficulty='Easy').update(boss_health=500)
    
def update_dungeon_recommended_levels():
    Dungeon.objects.update(recommended_level=Case(
        When(difficulty='Easy', then=Value(25)),
        When(difficulty='Medium', then=Value(50)),
        When(difficulty='Hard', then=Value(75))
    ))
    
def update_dungeon_rewards():
    Dungeon.objects.filter(boss_health=500).update(reward='1000 Gold')
    Dungeon.objects.filter(location__startswith='E').update(reward='New dungeon unlocked')
    Dungeon.objects.filter(location__endswith='s').update(reward='Dragonheart Amulet')
  
  
def set_new_locations():
    Dungeon.objects.update(location=Case(
        When(recommended_level=25, then=Value('Enchanted Maze')),
        When(recommended_level=50, then=Value('Grimstone Mines')),
        When(recommended_level=75, then=Value('Shadowed Abyss')),
    ))
  
  
# set_new_locations()
# update_dungeon_rewards()  

# dungeon1 = Dungeon(

# name="Dungeon 1",

# boss_name="Boss 1",

# boss_health=1000,

# recommended_level=75,

# reward="Gold",

# location="Eternal Hell",

# difficulty="Hard",

# )


# dungeon2 = Dungeon(

# name="Dungeon 2",

# boss_name="Boss 2",

# boss_health=400,

# recommended_level=25,

# reward="Experience",

# location="Crystal Caverns",

# difficulty="Easy",

# )


# Bulk save the instances

# bulk_create_dungeons([dungeon1, dungeon2])

# print(show_hard_dungeons())

# update_dungeon_names()

# update_dungeon_bosses_health()

# update_dungeon_recommended_levels()