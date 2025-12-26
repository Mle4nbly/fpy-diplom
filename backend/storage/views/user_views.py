from django.http import FileResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import User, File
from ..serializers import FileSerializer
import os
from django.shortcuts import get_object_or_404
from django.utils import timezone

class FilesListCreateView(generics.ListCreateAPIView):
  serializer_class = FileSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    return File.objects.filter(user=self.request.user)

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

class FileDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = FileSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    return File.objects.filter(user=self.request.user)

  def perform_destroy(self, instance):
    instance.file.delete(save=False)
    super().perform_destroy(instance)

class FileDownloadView(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request, pk):
    file_obj = get_object_or_404(File, pk=pk, user=request.user)
    file_path = file_obj.file.path

    if not os.path.exists(file_path):
      file_obj.delete()
      return Response({
        "detail": "The file is gone."
      }, status=status.HTTP_410_GONE)

    file_obj.last_download_at = timezone.now()
    file_obj.save(update_fields=['last_download_at'])

    return FileResponse(
      open(file_path, 'rb'),
      as_attachment=True,
      filename=file_obj.original_name
    )

class ShareFileDownloadView(APIView):
  def get(self, request, token):
    file_obj = get_object_or_404(File, share_link=token)

    file_path = file_obj.file.path

    if not os.path.exists(file_path):
        return Response({"detail": "File not found"}, status=status.HTTP_410_GONE)

    file_obj.last_download_at = timezone.now()
    file_obj.save(update_fields=['last_download_at'])

    return FileResponse(
      open(file_path, 'rb'),
      as_attachment=True,
      filename=file_obj.original_name
    )
  
class ShareFileDetailView(APIView):
  def get(self, request, token):
    file_obj = get_object_or_404(File, share_link=token)

    serializer = FileSerializer(file_obj)

    return Response(serializer.data)