from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Jewelry, JewelryMetal, JewelryStone, JewelrySize

class JewelryMetalInline(admin.TabularInline):
    model = JewelryMetal
    extra = 1


class JewelryStoneInline(admin.TabularInline):
    model = JewelryStone
    extra = 1


class JewelrySizeInline(admin.TabularInline):
    model = JewelrySize
    extra = 1

@admin.register(Jewelry)
class JewelryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'display_metals', 'display_stone_types', 'display_stone_colors',)
    list_filter = ('category', 'metals__title', 'stone_types__title', 'stone_colors__title',)
    search_fields = ('title',)

    inlines = [
        JewelryMetalInline,
        JewelryStoneInline,
        JewelrySizeInline,
    ]

    def display_metals(self, obj):
        return ", ".join([metal.title for metal in obj.metals.all()])
    display_metals.short_description = _("Metals")

    def display_stone_types(self, obj):
        return ", ".join([stone_type.title for stone_type in obj.stone_types.all()])
    display_stone_types.short_description = _("Stone Types")

    def display_stone_colors(self, obj):
        return ", ".join([stone_color.title for stone_color in obj.stone_colors.all()])
    display_stone_colors.short_description = _("Stone Colors")


#



# from django.contrib import admin
#
# from e_commerce_website.jewelry.models import Jewelry
#
#
# @admin.register(Jewelry)
# class JewelryAdmin(admin.ModelAdmin):
#     list_display = ('id', 'category', 'display_stone_types', 'display_stone_colors', 'display_stone_colors')
#
#     ordering = ('id',)
#
#     list_filter = ('category', 'display_stone_type_titles')
#
#     search_fields = ('title',)
#
#     sortable_by = ('id', 'category',)
#
#     fieldsets = (
#         (
#             'Title',
#             {
#                 'fields': ('title',)
#             }
#         ),
#         (
#             'Image urls',
#             {
#                 'fields':
#                     ('first_image_url', 'second_image_url',)
#             }
#         ),
#         (
#             'Category',
#             {
#                 'fields':
#                     ('category',)
#             }
#         )
#     )
#
#     def get_queryset(self, request):
#         queryset = super().get_queryset(request)
#         return queryset.prefetch_related('jewelry_stones__stone_type', 'jewelry_stones__stone_color', 'jewelry_metals__metal')
#
#     def display_stone_types(self, obj):
#         return ", ".join([stone.stone_type.get_title_display() for stone in obj.jewelry_stones.all()])
#
#     def display_stone_colors(self, obj):
#         return ", ".join([stone.stone_color.get_title_display() for stone in obj.jewelry_stones.all()])
#
#     def display_metals(self, obj):
#         return ", ".join([metal.metal.get_title_display() for metal in obj.jewelry_metals.all()])
#
#     display_stone_types.short_description = 'Stone Types'
#     display_stone_colors.short_description = 'Stone Colors'
#     display_metals.short_description = 'Metals'
#
#     def display_stone_type_titles(self):
#         stone_types_objs = 'jewelry_stones__stone_type'
#
#         stone_types_title = [s.get_title_display() for s in stone_types_objs]
#
#         return stone_types_title
