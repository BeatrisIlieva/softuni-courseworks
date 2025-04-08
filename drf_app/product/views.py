from rest_framework import generics as api_views, serializers
from rest_framework.pagination import PageNumberPagination

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param ="page_size"
class ProductsApiViews(api_views.ListAPIView):
    queryset = Product.objects.order_by("category", "pk")
    
    serializer_class = ProductSerializer
    
    pagination_class = CustomPageNumberPagination
