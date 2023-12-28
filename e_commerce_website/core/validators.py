from django.core import exceptions


def validate_only_letters(value):
    for ch in value:
        if not ch.isalpha():
            raise exceptions.ValidationError('Ensure this value contains only letters.')


def validate_only_digits(value):
    for d in value:
        if not d.isdigit():
            raise exceptions.ValidationError('Ensure this value contains only digits.')
