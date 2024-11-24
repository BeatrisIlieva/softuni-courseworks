from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from django_ecommerce_strategy_pattern.user_credential_details.managers import (
    UserCredentialDetailsManager,
)


class UserCredentialDetails(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = "email"

    objects = UserCredentialDetailsManager()

    email = models.EmailField(
        unique=True,
    )

    is_staff = models.BooleanField(
        default=False,
    )
