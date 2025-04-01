from typing import List

from customer import Customer
from equipment import Equipment
from exersice_plan import ExersicePlan
from subscription import Subscription
from trainer import Trainer


class Gym:
    def __init__(self):
        self.customers: List[Customer] = []
        self.trainers: List[Trainer] = []
        self.equipment: List[Equipment] = []
        self.plans: List[ExersicePlan] = []
        self.subscriptions: List[Subscription] = []

    def add_customer(self, customer: Customer) -> None:
        if customer in self.customers:
            return None

        self.customers.append(customer)

    def add_trainer(self, trainer: Trainer) -> None:
        if trainer in self.trainers:
            return None

        self.trainers.append(trainer)

    def add_equipment(self, equipment: Equipment) -> None:
        if equipment in self.equipment:
            return None

        self.equipment.append(equipment)

    def add_plan(self, plan: ExersicePlan) -> None:
        if plan in self.plans:
            return None

        self.plans.append(plan)

    def add_subscription(self, subscription: Subscription) -> None:
        if subscription in self.subscriptions:
            return None

        self.subscriptions.append(subscription)

    def subscription_info(self, subscription_id: int) -> str:
        subscription = [x for x in self.subscriptions if x.id == subscription_id][0]
        customer_id = subscription.customer_id
        customer = [x for x in self.customers if x.id == customer_id][0]
        trainer_id = subscription.trainer_id
        trainer = [x for x in self.trainers if x.id == trainer_id][0]
        exersice_plan_id = subscription.exercise_id
        plan = [x for x in self.plans if x.id == exersice_plan_id][0]
        equipment_id = plan.equipment_id
        equipment = [x for x in self.equipment if x.id == equipment_id][0]

        return f"{subscription}\n{customer}\n{trainer}\n{equipment}\n{plan}"


customer = Customer("John", "Maple Street", "john.smith@gmail.com")
equipment = Equipment("Treadmill")
trainer = Trainer("Peter")
subscription = Subscription("14.05.2020", 1, 1, 1)
plan = ExersicePlan(1, 1, 20)
gym = Gym()
gym.add_customer(customer)
gym.add_equipment(equipment)
gym.add_trainer(trainer)
gym.add_plan(plan)
gym.add_subscription(subscription)
print(Customer.get_next_id())
print(gym.subscription_info(1))


