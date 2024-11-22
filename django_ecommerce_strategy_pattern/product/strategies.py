from abc import ABC, abstractmethod


class SizeStrategy(ABC):
    @abstractmethod
    def get_size_choices(self):
        pass


class PriceStrategy(ABC):
    @abstractmethod
    def get_price_choices(self):
        pass


class EarringSizeStrategy(SizeStrategy):
    def get_size_choices(self):
        return [
            (4.05, 4.05),
            (4.98, 4.98),
            (5.86, 5.86),
        ]


class EarringPriceStrategy(PriceStrategy):
    def get_price_choices(self):
        return [
            (43_000.00, 43_000.00),
            (44_000.00, 44_000.00),
            (45_000.00, 45_000.00),
        ]


class BraceletSizeStrategy(SizeStrategy):
    def get_size_choices(self):
        return [
            (15.02, 15.02),
            (17.08, 17.08),
            (19.03, 19.03),
        ]


class BraceletPriceStrategy(PriceStrategy):
    def get_price_choices(self):
        return [
            (34_000.00, 34_000.00),
            (35_000.00, 35_000.00),
            (36_000.00, 36_000.00),
        ]


class NecklaceSizeStrategy(SizeStrategy):
    def get_size_choices(self):
        return [
            (40.64, 40.64),
            (43.18, 43.18),
            (45.72, 45.72),
        ]


class NecklacePriceStrategy(PriceStrategy):
    def get_price_choices(self):
        return [
            (55_000.00, 55_000.00),
            (56_000.00, 56_000.00),
            (57_000.00, 57_000.00),
        ]


class RingSizeStrategy(SizeStrategy):
    def get_size_choices(self):
        return [
            (4.07, 4.07),
            (4.09, 4.09),
            (5.05, 5.05),
        ]


class RingPriceStrategy(PriceStrategy):
    def get_price_choices(self):
        return [
            (23_000.00, 23_000.00),
            (24_000.00, 24_000.00),
            (25_000.00, 25_000.00),
        ]


class ProductContext:
    def __init__(self, product_instance):
        self.product_instance = product_instance

    def set_strategies(self):
        strategy_map = {
            "E": (EarringSizeStrategy(), EarringPriceStrategy()),
            "B": (BraceletSizeStrategy(), BraceletPriceStrategy()),
            "N": (NecklaceSizeStrategy(), NecklacePriceStrategy()),
            "R": (RingSizeStrategy(), RingPriceStrategy()),
        }

        product_type = self.product_instance.category.title

        size_strategy, price_strategy = strategy_map[product_type]
        
        self.product_instance.size.choices = size_strategy.get_size_choices()
        self.product_instance.price.choices = price_strategy.get_price_choices()
