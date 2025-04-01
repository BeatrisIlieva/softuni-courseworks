import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()
from main_app.models import UserProfile, Message, Student, CreditCard, Hotel, Room, RegularReservation, SpecialReservation
from datetime import date
from django.core.exceptions import ValidationError

# hotel = Hotel.objects.create(name="Hotel ABC", address="123 Main St")
# room1 = Room.objects.create(    hotel=hotel,    number="102",    capacity=2,    total_guests=1,    price_per_night=100.00)
# special_reservation1 = SpecialReservation(    room=room1,    start_date=date(2023, 1, 1),    end_date=date(2023, 1, 5))
# print(special_reservation1.save())
# special_reservation2 = SpecialReservation(    room=room1,    start_date=date(2023, 1, 10),    end_date=date(2023, 1, 12))
# print(special_reservation2.save())

# print(special_reservation1.calculate_total_cost())

# print(special_reservation1.reservation_period())

# special_reservation1 = SpecialReservation.objects.get(pk=)
# try:    
#     special_reservation1.extend_reservation(5)
# except ValidationError as e:    
#     print(e)