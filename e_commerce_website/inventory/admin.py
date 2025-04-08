from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from e_commerce_website.inventory.models import Inventory


@admin.register(Inventory)
class Inventory(admin.ModelAdmin):
    list_display = (
        'id',
        'jewelry',
        'quantity',
        'price',
        'created_at',
        'updated_at'
    )

    ordering = ('id',)

    list_filter = ('price', 'quantity',)

    search_fields = ('jewelry__title', 'quantity', 'price')

    sortable_by = ('id', 'jewelry', 'quantity', 'price',)

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
                    ('quantity',)
            }
        ),

        (
            'Price',
            {
                'fields':
                    ('price', 'discounted_price')
            }
        ),
    )

    def jewelry_title(self, obj):
        return obj.jewelry.title

    jewelry_title.short_description = _("Jewelry Title")
