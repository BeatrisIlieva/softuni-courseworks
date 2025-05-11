from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet

from libraryApi.books.models import Book, Publisher
from libraryApi.books.serializers import BookSerializer, BookSimpleSerializer, PublisherHyperlinkSerializer, PublisherSerializer

from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes


@api_view(['GET', 'POST', 'DELETE'])
def list_books_view(request):
    if request.method == 'GET':
        books = Book.objects.all()

        serializer = BookSerializer(books, many=True)

        # returns the books into JSON
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    request=BookSerializer,
    responses={201: BookSerializer, 400: BookSerializer},
)
class ListBooksView(APIView):
    def get(self, request):
        books = Book.objects.all()

        serializer = BookSerializer(books, many=True)

        # returns the books into JSON
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BookSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ListBooksApiView(ListAPIView):
#     queryset = Book.objects.all()
#     serializer_class = BookSerializer


@extend_schema(
    request=BookSerializer,
    responses={201: BookSerializer, 400: BookSerializer},
)
class BookViewSet(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSimpleSerializer

# class BookViewSet(APIView):
#     @staticmethod
#     def get_object(pk):
#         return get_object_or_404(Book, pk=pk)

#     def serializer_valid(self, serializer):
#         if serializer.is_valid():
#             serializer.save()

#             return Response(serializer.data, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request, pk: int):
#         book = self.get_object(pk)

#         serializer = BookSerializer(book)

#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def put(self, request, pk: int):
#         book = self.get_object(pk)

#         serializer = BookSerializer(book, data=request.data)

#         return self.serializer_valid(serializer)

#     def patch(self, request, pk: int):
#         book = self.get_object(pk)

#         serializer = BookSerializer(book, data=request.data, partial=True)

#         return self.serializer_valid(serializer)

#     def delete(self, request, pk: int):
#         book = self.get_object(pk)

#         book.delete()

#         return Response(status=status.HTTP_204_NO_CONTENT)


# class PublisherDetail(RetrieveAPIView):
#     queryset = Publisher.objects.all()
#     serializer_class = PublisherSerializer

class PublisherViewSet(ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class PublisherHyperlinkView(ListAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherHyperlinkSerializer
