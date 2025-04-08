from e_commerce_website.inventory.models import Inventory


def remove_quantity_from_inventory(jewelry, quantity):
    inventory = Inventory.objects.get(jewelry=jewelry)

    if quantity <= inventory.quantity:
        new_quantity = inventory.quantity - quantity
        inventory.quantity = new_quantity
        inventory.save()


def add_quantity_to_inventory(jewelry, quantity, max_quantity):
    inventory = Inventory.objects.get(jewelry=jewelry)

    if inventory.quantity + quantity <= max_quantity:
        new_quantity = min(inventory.quantity + quantity, max_quantity)
        inventory.quantity = new_quantity
        inventory.save()