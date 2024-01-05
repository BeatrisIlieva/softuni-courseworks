from django.contrib.auth.base_user import AbstractBaseUser

from django.contrib.auth.models import PermissionsMixin

from django.db import models

from e_commerce_website.accounts.manager import AccountUserManager

from e_commerce_website.jewelry.models import Jewelry


class AccountUser(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'email'

    objects = AccountUserManager()

    email = models.EmailField(
        unique=True,
        null=False,
        blank=False,
    )

    is_staff = models.BooleanField(
        default=False,
    )
