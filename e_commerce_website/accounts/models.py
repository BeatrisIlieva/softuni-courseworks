from django.db import models


class Account(models.Model):
    username = models.CharField()

    password = models.CharField()
