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
            'Jewelry',
            {
                'fields': ('jewelry',)
            }
        ),
        (
            'Quantity',
            {
                'fields':
                    ('quantity', )
            }
        ),
        (
            'Price',
            {
                'fields':
                    ('price', 'discounted_price')
            }
        ),
        (
            'Important dates',
            {
                'fields':
                    ('created_at', 'updated_at')
            }
        )
    )
