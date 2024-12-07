from rest_framework import generics as api_views, serializers

from drf_app.shopping_bag.models import ShoppingBag

from drf_app.shopping_bag.serializers import ShoppingBagSerializer


class ShoppingBagApiView(api_views.ListCreateAPIView):
    queryset = ShoppingBag.objects.all()
    serializer_class = ShoppingBagSerializer
