from django.contrib import admin

from .models.product import Earring, Bracelet, Necklace, Ring

@admin.register(Earring)
class EarringAdmin(admin.ModelAdmin):
    # list_display = ["drop_length"]
    pass

    fieldsets = (
            ("Details", {
                "fields": ("color", "drop_length", "description")
            }),
            ("Images", {
                "fields": ("first_image_url", "second_image_url"),
                # "classes": ("collapse",)
            })
        )