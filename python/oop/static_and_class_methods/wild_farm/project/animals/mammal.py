from project.animals.animal import Mammal
from project.food import Fruit, Vegetable, Meat


class Mouse(Mammal):
    def make_sound(self):
        return "Squeak"

    @property
    def food_that_eats(self):
        return [Vegetable, Fruit]

    @property
    def weight_gained(self):
        return 0.10


class Dog(Mammal):
    def make_sound(self):
        return "Woof!"

    @property
    def food_that_eats(self):
        return [Meat]

    @property
    def weight_gained(self):
        return 0.40


class Cat(Mammal):
    def make_sound(self):
        return "Meow"

    @property
    def food_that_eats(self):
        return [Vegetable, Meat]

    @property
    def weight_gained(self):
        return 0.30


class Tiger(Mammal):
    def make_sound(self):
        return "ROAR!!!"

    @property
    def food_that_eats(self):
        return [Meat]

    @property
    def weight_gained(self):
        return 1
