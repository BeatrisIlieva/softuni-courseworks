from django.db import models


class BaseImageUrl(models.Model):
    class Meta:
        abstract = True

    address = models.URLField()

    def __str__(self):
        return f"{self.address}"


class FirstImageUrl(BaseImageUrl):
    pass


class SecondImageUrl(BaseImageUrl):
    pass
