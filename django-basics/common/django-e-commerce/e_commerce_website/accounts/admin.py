from django.contrib import admin
from django.contrib.auth import get_user_model

from e_commerce_website.profiles.forms import AccountProfileForm

UserModel = get_user_model()


@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return False

    ordering = ('email',)
    list_display = ('email', 'last_login',)
    search_fields = ('email',)
    list_filter = ()

    add_form = AccountProfileForm

    fieldsets = (
        (
            None,
            {
                "fields":
                    ("email", "password")
            }
        ),

        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),

        (
            "Important dates",
            {
                "fields": ("last_login",)
            }
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        )

    )
