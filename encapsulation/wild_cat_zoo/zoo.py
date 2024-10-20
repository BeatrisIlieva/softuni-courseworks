from typing import List
from collections import deque

from encapsulation.wild_cat_zoo.animal import Animal
from encapsulation.wild_cat_zoo.worker import Worker


class Zoo:
    def __init__(self, name: str, budget: int, animal_capacity: int, workers_capacity: int) -> None:
        self.name = name
        self.budget = budget
        self.__animal_capacity = animal_capacity
        self.__workers_capacity = workers_capacity

        self.animals: List[Animal] = []
        self.workers: List[Worker] = []

    def add_animal(self, animal: Animal, price: int) -> str:
        if self.__animal_capacity <= len(self.animals):
            return "Not enough space for animal"

        if self.budget < price:
            return "Not enough budget"

        self.budget -= price
        self.animals.append(animal)

        return f"{animal.name} the {animal.__class__.__name__} added to the zoo"

    def hire_worker(self, worker: Worker) -> str:
        if self.__workers_capacity <= len(self.workers):
            return "Not enough space for worker"

        self.workers.append(worker)

        return f"{worker.name} the {worker.__class__.__name__} hired successfully"

    def fire_worker(self, worker_name: str) -> str:
        for w in self.workers:
            if w.name == worker_name:
                self.workers.remove(w)

                return f"{worker_name} fired successfully"

        return f"There is no {worker_name} in the zoo"

    def pay_workers(self) -> str:
        needed_amount = sum([w.salary for w in self.workers])

        if self.budget < needed_amount:
            return "You have no budget to pay your workers. They are unhappy"

        self.budget -= needed_amount

        return f"You payed your workers. They are happy. Budget left: {self.budget}"

    def tend_animals(self) -> str:
        needed_amount = sum([a.money_for_care for a in self.animals])

        if self.budget < needed_amount:
            return "You have no budget to tend the animals. They are unhappy."

        self.budget -= needed_amount

        return f"You tended all the animals. They are happy. Budget left: {self.budget}"

    def profit(self, amount: int) -> None:
        self.budget += amount

    def animals_status(self) -> str:

        string_to_print = [f"You have {len(self.animals)} animals\n"]

        result = {}
        all_instances_names = deque(Animal.__subclasses__())

        letters_order = deque(["L", "T", "C"])

        while all_instances_names:
            current_letter = letters_order.popleft()
            current_instance = all_instances_names.popleft()

            if current_instance.__name__[0] != current_letter:
                all_instances_names.append(current_instance)
                letters_order.appendleft(current_letter)
                continue

            result[f"{current_instance.__name__}s"] = {"count": 0, "animals": []}

            for a in self.animals:
                if a.__class__.__name__ == current_instance.__name__:
                    result[f"{current_instance.__name__}s"]["count"] += 1
                    result[f"{current_instance.__name__}s"]["animals"].append(a.__repr__())

        for key, value in result.items():
            string_to_print.append(f"----- {value['count']} {key}:\n")
            for el in value["animals"]:
                string_to_print.append(f"{el}\n")

        return "".join(string_to_print)[:-1]

    def workers_status(self) -> str:

        string_to_print = [f"You have {len(self.workers)} workers\n"]

        result = {}
        all_instances_names = deque(Worker.__subclasses__())

        letters_order = deque(["K", "C", "V"])

        while all_instances_names:
            current_letter = letters_order.popleft()
            current_instance = all_instances_names.popleft()

            if current_instance.__name__[0] != current_letter:
                all_instances_names.append(current_instance)
                letters_order.appendleft(current_letter)
                continue

            result[f"{current_instance.__name__}s"] = {"count": 0, "animals": []}

            for a in self.workers:
                if a.__class__.__name__ == current_instance.__name__:
                    result[f"{current_instance.__name__}s"]["count"] += 1
                    result[f"{current_instance.__name__}s"]["animals"].append(a.__repr__())

        for key, value in result.items():
            string_to_print.append(f"----- {value['count']} {key}:\n")
            for el in value["animals"]:
                string_to_print.append(f"{el}\n")

        return "".join(string_to_print)[:-1]
