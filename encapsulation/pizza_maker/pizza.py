from encapsulation.pizza_maker.dough import Dough
from encapsulation.pizza_maker.topping import Topping


class Pizza:
    def __init__(self, name: str, dough: Dough, max_number_of_toppings: int) -> None:
        self.name = name
        self.dough = dough
        self.max_number_of_toppings = max_number_of_toppings
        self.toppings = {}

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        if value == "":
            raise ValueError("The name cannot be an empty string")

        self.__name = value

    @property
    def dough(self):
        return self.__dough

    @dough.setter
    def dough(self, value):
        if value == None:
            raise ValueError("You should add dough to the pizza")

        self.__dough = value

    def add_topping(self, topping: Topping) -> str or None:
        if len(self.toppings) >= self.max_number_of_toppings:
            raise ValueError("Not enough space for another topping")

        if topping not in self.toppings:
            self.toppings[topping] = 0

        self.toppings[topping] += topping.weight

    def calculate_total_weight(self):

        toppings_weight = sum([t.weight for t in self.toppings])

        dough_weight = self.dough.weight

        return toppings_weight + dough_weight
