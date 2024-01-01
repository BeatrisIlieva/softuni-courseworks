from django.contrib import admin

from e_commerce_website.jewelry.models import Jewelry, Category


@admin.register(Jewelry)
class JewelryAdmin(admin.ModelAdmin):
    pass

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

