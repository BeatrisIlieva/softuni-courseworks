from customer import Customer
from equipment import Equipment
from exercise_plan import ExercisePlan
from subscription import Subscription
from trainer import Trainer


class Gym:
    def __init__(self):
        self.customers = []
        self.trainers = []
        self.equipment = []
        self.plans = []
        self.subscriptions = []

    def add_customer(self, customer: Customer):
        if customer not in self.customers:
            self.customers.append(customer)

    def add_trainer(self, trainer: Trainer):
        if trainer not in self.trainers:
            self.trainers.append(trainer)

    def add_equipment(self, equipment: Equipment):
        if equipment not in self.equipment:
            self.equipment.append(equipment)

    def add_plan(self, plan: ExercisePlan):
        if plan not in self.plans:
            self.plans.append(plan)

    def add_subscription(self, subscription: Subscription):
        if subscription not in self.subscriptions:
            self.subscriptions.append(subscription)

    def subscription_info(self, subscription_id: int):
        subscription = [x for x in self.subscriptions if x.id == subscription_id][0]
        customer = [x for x in self.customers if subscription.customer_id == x.id][0]
        trainer = [x for x in self.trainers if subscription.trainer_id == x.id][0]
        plan = [x for x in self.plans if subscription.exercise_id == x.id][0]
        equipment = [x for x in self.equipment if plan.equipment_id == x.id][0]
        
        return '\n'.join([str(subscription), str(customer), str(trainer), str(plan), str(equipment)])
