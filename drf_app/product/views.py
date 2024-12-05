from rest_framework import generics as api_views, serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductsApiViews(api_views.ListAPIView):
    queryset = Product.objects.all()
    
    serializer_class = ProductSerializer
