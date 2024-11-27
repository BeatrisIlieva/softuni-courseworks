from django.db import models


class BaseImageUrl(models.Model):
    class Meta:
        abstract = True

    address = models.URLField()


class FirstImageUrl(BaseImageUrl):
    pass


class SecondImageUrl(BaseImageUrl):
    pass
