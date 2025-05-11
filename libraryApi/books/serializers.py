from rest_framework import serializers

from libraryApi.books.models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Book
