import os
import django

# Set up Django
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "django_ecommerce_strategy_pattern.settings"
)
django.setup()

from django_ecommerce_strategy_pattern.product.models import Product

result = Product.objects.get_product_entity(1, 1)


for product in result:
    print(f"Product: {product}")
    print(f"Category: {product.category.get_title_display()}")
    print(f"Description: {product.description.content}")
    print(f"Color: {product.color.get_title_display()}")

    for inventory in product.product_inventory.all():
        print(f"  Inventory Quantity: {inventory.quantity}")
        print(f"  Size Code: {inventory.size.measurement}")  # The size code, e.g., "ES"
        print(
            f"  Size Measurement: {inventory.size.get_measurement_display()}"
        )  # The full measurement, e.g., "4.05"
        print(f"  Price Code: {inventory.price.amount}")  # The price code, e.g., "ES"
        print(
            f"  Price Amount: {inventory.price.get_amount_display()}"
        )  # The full price, e.g., "43,000.00"
        print(f"  Is Sold Out: {'Yes' if inventory.is_sold_out else 'No'}")
        print(f"Quantity: {inventory.quantity}")
