from django.db import models


class Description(models.Model):
    content = models.TextField(
        max_length=300,
    )
    
    def __str__(self):
        return  f"{self.content}"
