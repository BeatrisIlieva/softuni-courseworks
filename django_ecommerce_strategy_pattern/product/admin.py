from django.contrib import admin

from .models.product import (
    Product,
)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

    # list_filter = ("color",)

    # fieldsets = (
    #     ("Details", {"fields": ("color", "drop_length", "description")}),
    #     (
    #         "Images",
    #         {
    #             "fields": ("first_image_url", "second_image_url"),
    #             "classes": ("collapse",),
    #         },
    #     ),
    # )
