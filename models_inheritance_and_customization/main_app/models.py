from django.db import models
from django.core.exceptions import ValidationError
from datetime import timedelta
from decimal import Decimal


class UserProfile(models.Model):
    username = models.CharField(
        max_length=70,
        unique=True,
    )

    email = models.EmailField(
        unique=True,
    )

    bio = models.TextField(
        null=True,
        blank=True,
    )


class Message(models.Model):
    sender = models.ForeignKey(
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="sent_messages",
    )

    receiver = models.ForeignKey(
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="received_messages",
    )

    content = models.TextField()

    timestamp = models.DateTimeField(
        auto_now_add=True,
    )

    is_read = models.BooleanField(
        default=False,
    )

    def mark_as_read(self):
        self.is_read = True

    def reply_to_message(self, reply_content: str):
        message = Message(
            sender=self.receiver, receiver=self.sender, content=reply_content
        )
        message.save()
        return message

    def forward_message(self, receiver: UserProfile):
        message = Message(sender=self.receiver, receiver=receiver, content=self.content)
        message.save()
        return message


class StudentIDField(models.PositiveIntegerField):
    def to_python(self, value):
        try:
            return int(value)
        except ValueError:
            raise ValueError("Invalid input for student ID")

    def get_prep_value(self, value):
        cleaned_value = self.to_python(value)

        if cleaned_value <= 0:
            raise ValidationError("ID cannot be less than or equal to zero")

        return cleaned_value


class Student(models.Model):
    name = models.CharField(
        max_length=100,
    )

    student_id = StudentIDField()


class MaskedCreditCardField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs["max_length"] = 20
        super().__init__(*args, **kwargs)

    def to_python(self, value):
        if not isinstance(value, str):
            raise ValidationError("The card number must be a string")

        if not value.isdigit():
            raise ValidationError("The card number must contain only digits")

        if not len(value) == 16:
            raise ValidationError("The card number must be exactly 16 characters long")

        return f"****-****-****-{value[-4:]}"


class CreditCard(models.Model):
    card_owner = models.CharField(
        max_length=100,
    )

    card_number = MaskedCreditCardField()


class Hotel(models.Model):
    name = models.CharField(
        max_length=100,
    )

    address = models.CharField(
        max_length=200,
    )


class Room(models.Model):
    hotel = models.ForeignKey(
        to=Hotel,
        on_delete=models.CASCADE,
    )

    number = models.CharField(
        max_length=100,
        unique=True,
    )

    capacity = models.PositiveIntegerField()

    total_guests = models.PositiveIntegerField()

    price_per_night = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    def clean(self):
        if self.capacity < self.total_guests:
            raise ValidationError("Total guests are more than the capacity of the room")

    def save(self, *args, **kwargs):
        self.clean()

        super().save(*args, **kwargs)

        return f"Room {self.number} created successfully"


class BaseReservation(models.Model):
    class Meta:
        abstract = True

    room = models.ForeignKey(
        to=Room,
        on_delete=models.CASCADE,
    )

    start_date = models.DateField()

    end_date = models.DateField()

    def reservation_period(self):
        return (self.end_date - self.start_date).days

    def calculate_total_cost(self):
        cost = self.reservation_period() * self.room.price_per_night
        return f"{cost:.2f}"


class RegularReservation(BaseReservation):
    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("Start date cannot be after or in the same end date")

        dates_overlapping = RegularReservation.objects.filter(
            start_date__gte=self.start_date, end_date__lte=self.end_date
        )

        if dates_overlapping:
            raise ValidationError(f"Room {self.room.number} cannot be reserved")

    def save(self, *args, **kwargs):
        self.clean()

        super().save(*args, **kwargs)

        return f"Regular reservation for room {self.room.number}"


class SpecialReservation(BaseReservation):
    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("Start date cannot be after or in the same end date")

        dates_overlapping = SpecialReservation.objects.filter(
            start_date__gte=self.start_date, end_date__lte=self.end_date
        )

        if dates_overlapping:
            raise ValidationError(f"Room {self.room.number} cannot be reserved")

    def save(self, *args, **kwargs):
        self.clean()

        super().save(*args, **kwargs)

        return f"Special reservation for room {self.room.number}"
    
    def extend_reservation(self, days: int):
        end_date = self.end_date + timedelta(days=days)
        
        dates_overlapping = SpecialReservation.objects.filter(start_date__range=[self.start_date, end_date])
        
        if dates_overlapping:
            raise ValidationError("Error during extending reservation")
        
        self.end_date = end_date
        super().save()
        
        return f"Extended reservation for room {self.room.number} with {days} days"