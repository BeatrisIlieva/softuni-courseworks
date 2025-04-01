from typing import List

from project.customer import Customer
from project.dvd import DVD


class MovieWorld:
    DVD_CAPACITY = 15
    CUSTOMER_CAPACITY = 10

    def __init__(self, name):
        self.name = name
        self.customers: List[Customer] = []
        self.dvds: List[DVD] = []

    @staticmethod
    def dvd_capacity():
        return MovieWorld.DVD_CAPACITY

    @staticmethod
    def customer_capacity():
        return MovieWorld.CUSTOMER_CAPACITY

    def add_customer(self, customer: Customer):
        if self.customer_capacity() > len(self.customers):
            self.customers.append(customer)

    def add_dvd(self, dvd: DVD):
        if MovieWorld.dvd_capacity() > len(self.dvds):
            self.dvds.append(dvd)

    def rent_dvd(self, customer_id: int, dvd_id: int):
        dvd = self.find_dvd_by_id(dvd_id)
        customer = self.find_customer_by_id(customer_id)

        if dvd.is_rented:
            if dvd in customer.rented_dvds:
                return f"{customer.name} has already rented {dvd.name}"

            return "DVD is already rented"

        if dvd.age_restriction > customer.age:
            return f"{customer.name} should be at least {dvd.age_restriction} to rent this movie"

        dvd.is_rented = True
        customer.rented_dvds.append(dvd)

        return f"{customer.name} has successfully rented {dvd.name}"

    def return_dvd(self, customer_id, dvd_id):
        dvd = self.find_dvd_by_id(dvd_id)
        customer = self.find_customer_by_id(customer_id)

        if dvd not in customer.rented_dvds:
            return f"{customer.name} does not have that DVD"

        dvd.is_rented = False
        customer.rented_dvds.remove(dvd)

        return f"{customer.name} has successfully returned {dvd.name}"


    def __repr__(self):
        result = ""

        for c in self.customers:
            result += c.__repr__() + "\n"

        for d in self.dvds:
            result += d.__repr__() + "\n"

        return result


    def find_dvd_by_id(self, dvd_id):
        return [x for x in self.dvds if x.id == dvd_id][0]

    def find_customer_by_id(self, customer_id):
        return [x for x in self.customers if x.id == customer_id][0]
