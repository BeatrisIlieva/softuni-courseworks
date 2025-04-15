from django.db import models
from django.forms import ValidationError


class StudentIdField(models.PositiveIntegerField):

    @staticmethod
    def validate_field(value):
        try:
            return int(value)
        except ValueError:
            raise ValueError('Invalid input for Student ID')

    def to_python(self, value):
        return self.validate_field(value)

    def get_prep_value(self, value):
        validated_value = self.validate_field(value)

        if validated_value <= 0:
            raise ValidationError('ID cannot be less than or equal to zero')

        return validated_value


class Student(models.Model):
    name = models.CharField(
        max_length=100,
    )

    student_id = StudentIdField()
