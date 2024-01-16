from django.contrib import admin

from e_commerce_website.inventory.models import Inventory



@admin.register(Inventory)
class Inventory(admin.ModelAdmin):
    list_display = ('id', 'jewelry', 'quantity', 'price')

    ordering = ('id',)

    list_filter = ('price', 'quantity', 'created_at')

    search_fields = ('jewelry', 'quantity', 'price')

    sortable_by = ('id', 'jewelry', 'quantity', 'price', 'created_at')

    fieldsets = (
        (
            'Title',
            {
                'fields': ('title',)
            }
        ),
        (
            'Image urls',
            {
                'fields':
                    ('first_image_url', 'second_image_url',)
            }
        ),
        (
            'Category',
            {
                'fields':
                    ('category',)
            }
        )
    )
