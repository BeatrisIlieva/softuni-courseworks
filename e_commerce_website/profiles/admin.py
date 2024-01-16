from django.contrib import admin

from e_commerce_website.profiles.models import AccountProfile


@admin.register(AccountProfile)
class AccountProfile(admin.ModelAdmin):
    readonly_fields = ('user',)

    list_display = (
        'user',
        'first_name',
        'last_name',
    )

    ordering = (
        'user',
        'first_name',
        'last_name',
        'country',
    )

    list_filter = (
        'country',
        'city',
        'delivery_address'
    )

    search_fields = (
        'first_name',
        'last_name',
        'country',
        'city',
        'delivery_address'
    )

    sortable_by = ('user', 'first_name', 'last_name', 'country', 'city', 'delivery_address')

    fieldsets = (
        (
            'Personal Information',
            {
                'fields': ('first_name', 'last_name')
            }
        ),
        (
            'Contact Details',
            {
                'fields':
                    ('phone_number', )
            }
        ),
        (
            'Delivery Address',
            {
                'fields':
                    ('country', 'city', 'delivery_address')
            }
        )
    )
