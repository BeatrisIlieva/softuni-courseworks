from rest_framework import generics as api_views, serializers, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import  viewsets

from .models import UserCredentialDetails

class ApiLoginView(ObtainAuthToken):
    pass

class UserCredentialDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCredentialDetails
        fields = ("email", "password")


class UserCredentialDetailsApiViews(api_views.CreateAPIView):
    queryset = UserCredentialDetails.objects.all()
    
    serializer_class = UserCredentialDetailsSerializer
    
    # permission_classes = (
    #     permissions.IsAuthenticated
    # )
    
class UserCredentialsApiViewSet(viewsets.ModelViewSet):
    queryset =UserCredentialDetails.objects.all()
    serializer_class = UserCredentialDetailsSerializer
