from rest_framework import generics as api_views, serializers
from drf_app.shopping_bag.models import ShoppingBag


class ShoppingBagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingBag
        fields = "__all__"
