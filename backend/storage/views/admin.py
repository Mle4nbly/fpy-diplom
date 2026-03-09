from django.http import FileResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import User, File
from ..serializers import FileSerializer
import os
from django.shortcuts import get_object_or_404
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


class AdminFilesListCreateView(generics.ListCreateAPIView):
  serializer_class = FileSerializer
  permission_classes = [IsAdmin]

  def get_queryset(self):
    username = self.kwargs['username']
    user = get_object_or_404(User, username=username)
    return File.objects.filter(user=user)

  def perform_create(self, serializer):
    username = self.kwargs['username']
    user = get_object_or_404(User, username=username)
    serializer.save(user=user)
    
  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    if not serializer.is_valid():
        logger.warning(f"Admin {request.user.username} failed file upload validation: {serializer.errors}")
    return super().create(request, *args, **kwargs)

class AdminFileDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = FileSerializer
  permission_classes = [IsAdmin]

  def get_queryset(self):
    username = self.kwargs['username']
    user = get_object_or_404(User, username=username)
    return File.objects.filter(user=user)

  def perform_destroy(self, instance):
    file_name = instance.file.name
    instance.file.delete(save=False)
    super().perform_destroy(instance)
    logger.info(f"Admin {self.request.user.username} deleted file {file_name}")

class AdminFileDownloadView(APIView):
  permission_classes = [IsAdmin]

  def get(self, request, username, pk):
    user = get_object_or_404(User, username=username)
    file_obj = get_object_or_404(File, pk=pk, user=user)
    file_path = file_obj.file.path

    if not os.path.exists(file_path):
      file_obj.delete()
      return Response({
        "detail": "The file is gone."
      }, status=status.HTTP_410_GONE)

    return FileResponse(
      open(file_path, 'rb'),
      as_attachment=True,
      filename=file_obj.original_name
    )