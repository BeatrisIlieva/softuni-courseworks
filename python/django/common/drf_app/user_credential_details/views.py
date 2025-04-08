from rest_framework import generics as api_views
from rest_framework.authtoken import views as api_auth_views
from rest_framework.response import Response
from drf_app.user_credential_details.serializers import RegisterUserSerializer


class ApiLoginUserView(api_auth_views.ObtainAuthToken):
    pass


class ApiRegisterUserView(api_views.CreateAPIView):

    serializer_class = RegisterUserSerializer


class ApiLogoutUserView(api_views.views.APIView):
    def post(self, request, *args, **kwargs):
        return self.__perform_logout(request)

    def get(self, request, *args, **kwargs):
        return self.__perform_logout(request)

    @staticmethod
    def __perform_logout(request):
        request.user.auth_token.delete()

        return Response({"message": "user logged out"})


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
