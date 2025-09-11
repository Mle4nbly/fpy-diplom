from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from .models import User
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class LoginView(APIView):
  def post(self, request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
      login(request, user)
      return Response({"message": "Login successful"})
    return Response({"error": "Invalid credentials"}, status=400)
  
class LogoutView(APIView):
  def post(self, request):
    logout(request)
    return Response({"message": "Logged out"})
