from django.db import models

class UserCredentialDetails(models.Model):
    email = models.EmailField(
        unique=True,
    )
    
    password = 
