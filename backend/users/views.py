from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, Sum
from .models import User
from .serializers import UserSerializer, UserListSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [permissions.IsAuthenticated]

class UserListView(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request):
    if not request.user.is_admin:
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

    queryset = (
       User.objects.annotate(
          files_count=Count("file", distinct=True),
          total_size=Sum("file__size")
       )
    )

    for user in queryset:
      user.files_count = user.files_count or 0
      user.total_size = user.total_size or 0

    serializer = UserListSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
   
class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def create(self, request):
    serializer = self.get_serializer(data=request.data)
    print(request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "message": "Registration successful",
        "token": token.key,
        "username": user.username
    }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)

            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                "message": "Login successful",
                "token": token.key,
                "username": user.username
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
  def post(self, request):
    logout(request)
    return Response({"message": "Logged out"})
