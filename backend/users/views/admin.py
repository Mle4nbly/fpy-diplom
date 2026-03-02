from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, Sum
from ..models import User
from ..serializers import UserListSerializer, UserDetailSerializer

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