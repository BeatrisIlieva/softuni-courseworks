from django.contrib import admin

from e_commerce_website.inventory.models import Inventory
from e_commerce_website.profiles.models import AccountProfile


@admin.register(Inventory)
class Inventory(admin.ModelAdmin):
    pass
