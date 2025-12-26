from django.http import FileResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import User, File
from ..serializers import FileSerializer
import os
from django.shortcuts import get_object_or_404

class IsAdmin(permissions.BasePermission):
  def has_permission(self, request, view):
    return bool(
      request.user and 
      request.user.is_authenticated and 
      request.user.is_admin
    )

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

class AdminFileDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = FileSerializer
  permission_classes = [IsAdmin]

  def get_queryset(self):
    username = self.kwargs['username']
    user = get_object_or_404(User, username=username)
    return File.objects.filter(user=user)

  def perform_destroy(self, instance):
    instance.file.delete(save=False)
    super().perform_destroy(instance)

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