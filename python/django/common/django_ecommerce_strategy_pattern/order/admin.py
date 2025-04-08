from django.contrib import admin

from .models import OrderProducts


@admin.register(OrderProducts)
class OrderProductsAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "product",
        "size",
        "quantity",
        "total_price",
    )
