from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, Sum
from .models import User
from .serializers import UserSerializer, UserListSerializer, LoginSerializer

class IsAdmin(permissions.BasePermission):
  def has_permission(self, request, view):
    return bool(request.user and request.user.is_authenticated and request.user.is_admin)

class UserListView(generics.ListAPIView):
  permission_classes = [IsAdmin]
  serializer_class = UserListSerializer

  def get_queryset(self):
    return (
      User.objects
      .annotate(
        files_count=Count("file", distinct=True),
        total_size=Sum("file__size")
      )
    )
   
class RegisterView(generics.CreateAPIView):
  serializer_class = UserSerializer

  def perform_create(self, serializer):
    self.user = serializer.save(self.request.user)
    self.token, _ = Token.objects.get_or_create(user=self.user)

  def create(self, request, *args, **kwargs):
    response =  super().create(request, *args, **kwargs)
    response.data = {
      "message": "Registration successful.",
      "token": self.token.key,
      "username": self.user.username
    }

    return response

class LoginView(APIView):
    def post(self, request):
      serializer = LoginSerializer(data=request.data)
      validated_data = serializer.is_valid(raise_exception=True)

      user = authenticate(**validated_data);

      if not user:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

      login(request, user)
      token, _ = Token.objects.get_or_create(user=user)

      return Response({
        "message": "Login successful.",
        "token": token.key,
        "username": user.username
      })

class LogoutView(APIView):
  def post(self, request):
    logout(request)

    return Response({"message": "Logged out."})
