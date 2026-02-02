from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, Sum
from .models import User
from .serializers import UserSerializer, UserListSerializer, LoginSerializer, UserDetailSerializer

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

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAdmin]
  serializer_class = UserDetailSerializer

  def get_queryset(self):
    return User.objects.exclude(pk=self.request.user.pk)

class MeView(generics.RetrieveAPIView):
  serializer_class = UserDetailSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_object(self):
    return self.request.user

class RegisterView(generics.CreateAPIView):
  permission_classes = [permissions.AllowAny]
  serializer_class = UserSerializer

  def perform_create(self, serializer):
    print(self.request)
    self.user = serializer.save()
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
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "error": "Invalid credentials",
            }, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data
        user = authenticate(username=validated_data['username'], password=validated_data['password'])

        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Login successful.",
            "token": token.key,
            "username": user.username,
            "is_admin": user.is_admin
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
  def post(self, request):
    logout(request)

    return Response({"message": "Logged out."})