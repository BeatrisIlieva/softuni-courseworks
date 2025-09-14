from abc import ABC, abstractmethod


class Animal(ABC):
    def __init__(self, name, weight):
        super().__init__()
        self.name = name
        self.weight = weight
        self.food_eaten = 0

    @abstractmethod
    def make_sound(self):
        pass

    def feed(self, food):
        if not type(food) in self.food_that_eats:
            return f'{self.__class__.__name__} does not eat {food.__class__.__name__}!'

        self.weight += food.quantity * self.weight_that_gains
        self.food_eaten += food.quantity

    @property
    @abstractmethod
    def food_that_eats(self):
        pass

    @property
    @abstractmethod
    def weight_that_gains(self):
        pass
