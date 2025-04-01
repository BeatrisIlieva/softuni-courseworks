from typing import List

from project.product import Product


class ProductRepository:
    def __init__(self) -> None:
        self.products: List[Product] = []

    def add(self, product: Product) -> None:
        self.products.append(product)

    def find(self, product_name: str) -> Product:
        return [p for p in self.products if p.name == product_name][0]

    def remove(self, product_name : str) -> None:
        self.products.remove([p for p in self.products if p.name == product_name][0])

    def __repr__(self):
        return "\n".join([f"{p.name}: {p.quantity}" for p in self.products])

