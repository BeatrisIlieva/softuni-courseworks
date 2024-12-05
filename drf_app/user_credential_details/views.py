from rest_framework import generics as api_views, serializers

from .models import UserCredentialDetails


class UserCredentialDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCredentialDetails
        fields = "__all__"


class UserCredentialDetailsApiViews(api_views.ListAPIView):
    queryset = UserCredentialDetails.objects.all()
    
    serializer_class = UserCredentialDetailsSerializer
