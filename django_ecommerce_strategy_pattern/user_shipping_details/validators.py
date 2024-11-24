# from django.core.exceptions import ValidationError
# from django.utils.deconstruct import deconstructible
# from abc import ABC, abstractmethod


# @deconstructible
# class LengthValidationStrategy(ABC):
#     def __init__(self, error_message):
#         self.error_message = error_message

#     @abstractmethod
#     def __call__(self, value):
#         pass


# class MinLengthValidationStrategy(LengthValidationStrategy):
#     def __init__(self, min_length, error_message):
#         super().__init__(error_message)
#         self.min_length = min_length

#     def __call__(self, value):
#         if len(value) < self.min_length:
#             raise ValidationError(self.error_message)


# class MaxLengthValidationStrategy(LengthValidationStrategy):
#     def __init__(self, max_length, error_message):
#         super().__init__(error_message)
#         self.max_length = max_length

#     def __call__(self, value):
#         if len(value) > self.max_length:
#             raise ValidationError(self.error_message)


# class OnlyLettersValidator(LengthValidationStrategy):
#     def __init__(self, error_message):
#         super().__init__(error_message)

#     def __call__(self, value):
#         if not value.isalpha():
#             raise ValidationError(self.error_message)


from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible
from enum import Enum

from abc import ABC, abstractmethod


class ValidationMethod(Enum):

    ZERO_LENGTH = "zero_length"
    MIN_LENGTH = "min_length"
    MAX_LENGTH = "max_length"


# @deconstructible
class LengthValidationStrategy(ABC):

    @abstractmethod
    def validate(self, value, length_limit: int, error_message: str):
        pass


class MinLengthValidationStrategy(LengthValidationStrategy):
    def validate(self, value, length_limit: int, error_message: str):
        if len(value) < length_limit:
            raise ValidationError(
                message=error_message,
                code="invalid",
            )


class MaxLengthValidationStrategy(LengthValidationStrategy):
    def validate(self, value, length_limit: int, error_message: str):
        if len(value) > length_limit:
            raise ValidationError(
                message=error_message,
                code="invalid",
            )


class ValidationContext:
    def __init__(self, strategy: LengthValidationStrategy):
        self.strategy = strategy

    def validate(self, value, length_limit: int, error_message: str):
        return self.strategy.validate(value, length_limit, error_message)


@deconstructible
class Validator:
    def __init__(self, length_limit: int, error_message: str, method: str):
        self.method = method
        self.length_limit = length_limit
        self.error_message = error_message

    def __call__(self, value):
        strategies = {
            ValidationMethod.MIN_LENGTH: MinLengthValidationStrategy(),
            ValidationMethod.MAX_LENGTH: MaxLengthValidationStrategy(),
        }

        context = ValidationContext(strategy=strategies[self.method])

        return context.validate(value, self.length_limit, self.error_message)
