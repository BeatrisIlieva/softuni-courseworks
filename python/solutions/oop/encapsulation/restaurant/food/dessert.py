from oop.encapsulation.food.food import Food


class Dessert(Food):
    GRAMS = 22
    
    def __init__(self, name, price):
        super().__init__(name, price, Dessert.GRAMS)
