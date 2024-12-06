from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

from django.contrib.auth.password_validation import validate_password

from rest_framework.authtoken.models import Token

from rest_framework.authtoken import views as api_auth_views

from rest_framework import generics as api_views, serializers, permissions
# from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import  viewsets
from rest_framework.views import APIView

from .models import UserCredentialDetails

UserModel = get_user_model()

from rest_framework.response import Response


class ApiLoginUserView(api_auth_views.ObtainAuthToken):
    pass

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (UserModel.USERNAME_FIELD, "password")
        
    # Model -> JSON, No saving
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop("password")
        
        return data
    
    def save(self, **kwargs):
        user = super().save(*kwargs)
        
        user.set_password(user.password)
        user.save()
        
        return user
    
    # JSON -> Model
    # def to_internal_value(self, data):
    #     pass
    
    def validate(self, attrs):
        password = attrs.get("password", None)
        
        result = validate_password(password)

class ApiRegisterUserView(api_views.CreateAPIView):

    # queryset = UserCredentialDetails.objects.all()
    serializer_class = RegisterUserSerializer
    # def post(self, request, *args, **kwargs):        
    #     result = super().post(request, *args, **kwargs)
    #     return result

class ApiLogoutUserView(api_views.ListAPIView):
    pass

# class UserCredentialDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserCredentialDetails
#         fields = ("email", "password",)


# class UserCredentialDetailsApiViews(api_views.CreateAPIView):
#     queryset = UserCredentialDetails.objects.all()
    
#     serializer_class = UserCredentialDetailsSerializer
    
#     # permission_classes = (
#     #     permissions.IsAuthenticated
#     # )
    
# class UserCredentialsApiViewSet(viewsets.ModelViewSet):
#     queryset =UserCredentialDetails.objects.all()
#     serializer_class = UserCredentialDetailsSerializer
