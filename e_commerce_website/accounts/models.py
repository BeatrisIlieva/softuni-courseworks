from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core import validators
from django.db import models

from e_commerce_website.accounts.manager import AccountUserManager
from e_commerce_website.core.validators import validate_only_letters


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


class AccountProfile(models.Model):
    FIRST_NAME_MIN_LENGTH = 2
    FIRST_NAME_MAX_LENGTH = 30

    LAST_NAME_MIN_LENGTH = 2
    LAST_NAME_MAX_LENGTH = 30

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                FIRST_NAME_MIN_LENGTH,
            ),
            validate_only_letters,
        ),
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=(
            validators.MinLengthValidator(
                LAST_NAME_MIN_LENGTH,
            ),
            validate_only_letters,
        ),
    )

    phone_number = models.CharField(
        max_length=30,
        null=True,
        blank=True,
    )

    user = models.OneToOneField(
        to=AccountUser,
        on_delete=models.CASCADE,
        primary_key=True
    )

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'