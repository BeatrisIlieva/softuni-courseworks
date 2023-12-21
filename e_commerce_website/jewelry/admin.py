from django.contrib import admin

from e_commerce_website.jewelry.models import Jewelry

@admin.register(Jewelry)
class JewelryAdmin(admin.ModelAdmin):
    pass

