from abc import ABC, abstractmethod


class Vehicle(ABC):
    def __init__(self, fuel_quantity: float, fuel_consumption: float) -> None:
        self.fuel_quantity = fuel_quantity
        self.fuel_consumption = fuel_consumption

    @abstractmethod
    def drive(self, distance: int) -> None:
        ...

    @abstractmethod
    def refuel(self, liters: int) -> None:
        ...


class Car(Vehicle):
    CONDITION_ON = 0.9

    def drive(self, distance: int):
        consumption = distance * (self.fuel_consumption + 0.9)

        if self.fuel_quantity >= consumption:
            self.fuel_quantity -= consumption

    def refuel(self, liters):
        self.fuel_quantity += liters


class Truck(Vehicle):
    CONDITION_ON = 1.6

    def drive(self, distance: int):
        consumption = distance * (self.fuel_consumption + 1.6)

        if self.fuel_quantity >= consumption:
            self.fuel_quantity -= consumption

    def refuel(self, liters):
        self.fuel_quantity += liters * 0.95


truck = Truck(100, 15)
truck.drive(5)
print(truck.fuel_quantity)
truck.refuel(50)
print(truck.fuel_quantity)
