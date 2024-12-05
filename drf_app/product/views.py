from rest_framework import generics as api_views, serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    pass


class ProductsApiViews(api_views.ListAPIView):
    queryset = ...
