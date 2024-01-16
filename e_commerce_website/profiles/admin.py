from django.contrib import admin

from e_commerce_website.profiles.models import AccountProfile


@admin.register(AccountProfile)
class AccountProfile(admin.ModelAdmin):
    readonly_fields = ('user',)
