from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, Sum
from ..models import User
from ..serializers import UserListSerializer, UserAdminSerializer
import logging

logger = logging.getLogger(__name__)

class IsAdmin(permissions.BasePermission):
  def has_permission(self, request, view):
    if bool(
      request.user and 
      request.user.is_authenticated and 
      request.user.is_admin
    ) == True:
      return True
    else:
      logger.warning(f"Unauthorized admin access attempt by user {getattr(request.user, 'username', 'Anonymous')}")
      return False
  
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
  serializer_class = UserAdminSerializer

  def get_queryset(self):
    return User.objects.exclude(pk=self.request.user.pk)