from django.core.exceptions import ValidationError

from .models import UserCredentialDetails


def register_user(email, password):
    try:
        UserCredentialDetails.objects.create(email=email, password=password)
    except ValidationError as e:
        print(e.messages[0])
