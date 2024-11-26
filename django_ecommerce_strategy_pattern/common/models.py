from django.db import models

from django.core.validators import (
    RegexValidator,
    MinLengthValidator,
)

from django.db import models


# class CreateNonNullableCharFieldMixin:

#     def create_non_nullable_char_field(
#         max_length,
#         min_length,
#         pattern,
#         pattern_error_message,
#     ):
#         return models.CharField(
#             max_length=max_length,
#             error_messages={
#                 "blank": "This field is required",
#                 "max_length": f"This field must not exceed {max_length} characters",
#             },
#             validators=[
#                 MinLengthValidator(
#                     limit_value=min_length,
#                     message=f"This field must be at least {min_length} characters long",
#                 ),
#                 RegexValidator(
#                     regex=pattern,
#                     message=pattern_error_message,
#                 ),
#             ],
#         )


class BaseCreateCharField(models.Model):
    class Meta:
        abstract = True

    @staticmethod
    def create_char_field(
        max_length,
        min_length,
        pattern,
        pattern_error_message,
        null_value,
        blank_value,
    ):
        return models.CharField(
            max_length=max_length,
            error_messages={
                "blank": "This field is required",
                "max_length": f"This field must not exceed {max_length} characters",
            },
            validators=[
                MinLengthValidator(
                    limit_value=min_length,
                    message=f"This field must be at least {min_length} characters long",
                ),
                RegexValidator(
                    regex=pattern,
                    message=pattern_error_message,
                ),
            ],
            null=null_value,
            blank=blank_value,
        )
