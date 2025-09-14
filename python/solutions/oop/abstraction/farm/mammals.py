from abc import ABC
from animal import Animal
from food import Fruit, Meat, Vegetable


class Mammal(ABC, Animal):
    def __init__(self, name, weight, living_region):
        super().__init__(name, weight)
        self.living_region = living_region
        
    def __repr__(self):
        return f'{self.__class__.__name__} [{self.name}, {self.weight}, {self.living_region}, {self.food_eaten}]'


class Mouse(Mammal):
    @staticmethod
    def make_sound():
        return 'Squeak'

    @property
    def food_that_eats(self):
        return [Vegetable, Fruit]

    @property
    def weight_that_gains(self):
        return 0.10


class Dog(Mammal):
    @staticmethod
    def make_sound():
        return 'Woof!'

    @property
    def food_that_eats(self):
        return [Meat]

    @property
    def weight_that_gains(self):
        return 0.4


class Cat(Mammal):
    @staticmethod
    def make_sound():
        return 'Meow'

    @property
    def food_that_eats(self):
        return [Vegetable, Meat]

    @property
    def weight_that_gains(self):
        return 0.30


class Tiger(Mammal):
    @staticmethod
    def make_sound():
        return 'ROAR!!!'

    @property
    def food_that_eats(self):
        return [Meat]

    @property
    def weight_that_gains(self):
        return 1
