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
    list_display = (
        'title',
        'category',
        'display_metals',
        'display_stone_types',
        'display_stone_colors',
    )

    list_filter = (
        'category',
        'metals__title',
        'stone_types__title',
        'stone_colors__title',
    )

    search_fields = ('title',)

    inlines = [
        JewelryMetalInline,
        JewelryStoneInline,
        JewelrySizeInline,
    ]

    def display_metals(self, obj):
        return ", ".join(
            [metal.title for metal in obj.metals.all()]
        )

    display_metals.short_description = _("Metals")

    def display_stone_types(self, obj):
        return ", ".join(
            [stone_type.title for stone_type in obj.stone_types.all()]
        )

    display_stone_types.short_description = _("Stone Types")

    def display_stone_colors(self, obj):
        return ", ".join(
            [stone_color.title for stone_color in obj.stone_colors.all()]
        )

    display_stone_colors.short_description = _("Stone Colors")
