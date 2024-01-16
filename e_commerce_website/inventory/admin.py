from django.contrib import admin

from e_commerce_website.inventory.models import Inventory



@admin.register(Inventory)
class Inventory(admin.ModelAdmin):
    pass
