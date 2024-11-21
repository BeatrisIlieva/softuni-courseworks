from django.db import models
from django.core.exceptions import ValidationError


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
            return "Invalid input for student ID"

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
