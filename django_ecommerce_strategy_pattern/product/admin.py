from django.contrib import admin

from .models.product import Earring, Bracelet, Necklace, Ring


@admin.register(Earring)
class EarringAdmin(admin.ModelAdmin):

    list_filter = ("color",)

    fieldsets = (
        ("Details", {"fields": ("color", "drop_length", "description")}),
        (
            "Images",
            {
                "fields": ("first_image_url", "second_image_url"),
                "classes": ("collapse",),
            },
        ),
    )
    
@admin.register(Bracelet)
class BraceletAdmin(admin.ModelAdmin):

    list_filter = ("color",)

    fieldsets = (
        ("Details", {"fields": ("color", "drop_length", "description")}),
        (
            "Images",
            {
                "fields": ("first_image_url", "second_image_url"),
                "classes": ("collapse",),
            },
        ),
    )
