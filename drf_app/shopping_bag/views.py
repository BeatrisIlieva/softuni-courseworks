from rest_framework import generics as api_views, serializers

from drf_app.shopping_bag.models import ShoppingBag


class ShoppingBagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingBag
        fields = "__all__"


class ShoppingBagApiView(api_views.ListCreateAPIView):
    queryset = ShoppingBag.objects.all()
    serializer_class = ShoppingBagSerializer
