from django.contrib import admin

from e_commerce_website.jewelry.models import Jewelry, JewelryDetails

@admin.register(JewelryDetails)
class JewelryDetailsAdmin(admin.ModelAdmin):
    pass

@admin.register(Jewelry)
class JewelryDetailsAdmin(admin.ModelAdmin):
    pass
