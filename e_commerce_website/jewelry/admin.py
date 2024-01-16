from django.contrib import admin

from e_commerce_website.jewelry.models import Jewelry, Category


@admin.register(Jewelry)
class JewelryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', )
    ordering = ('id',)
    list_filter = ('category',)
    search_fields = ('title',)
    sortable_by = ('category',)

    # def jewelry_id(self, obj):
    #     return obj.id

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
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

