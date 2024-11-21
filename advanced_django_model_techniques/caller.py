import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()
from main_app.models import Customer
from django.core.exceptions import ValidationError


# customer = Customer(name="aa", age=18, email="bea@abv.bg", phone_number="+359123456787", website_url="https://softuni.bg/trainings/4253/python-orm-october-2023#lesson-59969")

# try:    
#     customer.full_clean()    
#     customer.save()
# except ValidationError as e:    
#     print('\n'.join(e.messages))
