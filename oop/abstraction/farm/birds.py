from animal import Animal
from food import Fruit, Meat, Seed, Vegetable


class Bird(Animal):
    def __init__(self, name, weight, wing_size):
        super().__init__(name, weight)
        self.wing_size = wing_size
        
    def __repr__(self):
        return f'{self.__class__.__name__} [{self.name}, {self.wing_size}, {self.weight}, {self.food_eaten}]'


class Owl(Bird):
    @staticmethod
    def make_sound():
        return 'Hoot Hoot'

    @property
    def food_that_eats(self):
        return [Meat]

    @property
    def weight_that_gains(self):
        return 0.25


class Hen(Bird):
    @staticmethod
    def make_sound():
        return 'Cluck'

    @property
    def food_that_eats(self):
        return [Seed, Meat, Fruit, Vegetable]

    @property
    def weight_that_gains(self):
        return 0.35
