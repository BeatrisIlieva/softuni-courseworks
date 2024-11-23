import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_ecommerce_strategy_pattern.settings")
django.setup()

from django_ecommerce_strategy_pattern.product.models import Product

result = Product.objects.filter(category__pk=1).select_related("category", "description", "color").prefetch_related("inventory")

for product in result:
    print(product.category.get_title_display())
    print(product.description.content)
    print(product.color.get_title_display())
    print(product.first_image_url)
    for inventory in product.inventory.all():
        print(inventory.price)
        print(inventory.size)
        print(inventory.quantity)
        
