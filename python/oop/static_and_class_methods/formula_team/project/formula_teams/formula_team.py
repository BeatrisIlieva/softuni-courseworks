from abc import ABC, abstractmethod


class FormulaTeam(ABC):
    def __init__(self, budget: int) -> None:
        self.budget = budget

    @property
    def budget(self):
        return self.__budget

    @budget.setter
    def budget(self, value):
        if value < 1_000_000:
            raise ValueError("F1 is an expensive sport, find more sponsors!")

        self.__budget = value

    def calculate_revenue_after_race(self, race_pos: int):
        income = 0

        for sponsorship in self.sponsors.values():
            for key, value in sponsorship.items():
                if race_pos <= key:
                    income += value
                    break

        revenue = income - self.expenses

        self.budget += revenue

        return f"The revenue after the race is {revenue}$. Current budget {self.budget}$"

    @property
    @abstractmethod
    def sponsors(self):
        ...

    @property
    @abstractmethod
    def expenses(self):
        ...
