from django.http import FileResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import User, File
from ..serializers import FileSerializer
import os
from django.shortcuts import get_object_or_404
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class FilesListCreateView(generics.ListCreateAPIView):
  serializer_class = FileSerializer

  def get_queryset(self):
    return File.objects.filter(user=self.request.user)

  def perform_create(self, serializer):
    file_name = serializer.validated_data.get('file').name
    serializer.save(user=self.request.user)
    logger.info(f"User {self.request.user.username} uploaded file {file_name}")

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    if not serializer.is_valid():
        logger.warning(f"User {request.user.username} failed file upload validation: {serializer.errors}")
    return super().create(request, *args, **kwargs)

class FileDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = FileSerializer

  def get_queryset(self):
    return File.objects.filter(user=self.request.user)

  def perform_destroy(self, instance):
    file_name = instance.file.name
    instance.file.delete(save=False)
    super().perform_destroy(instance)
    logger.info(f"User {self.request.user.username} deleted file {file_name}")

class FileDownloadView(APIView):
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
    logger.info(f"User {request.user.username} downloaded file {file_obj.original_name}")

    return FileResponse(
      open(file_path, 'rb'),
      as_attachment=True,
      filename=file_obj.original_name
    )

class ShareFileDownloadView(APIView):
  permission_classes = [permissions.AllowAny]

  def get(self, request, token):
    file_obj = get_object_or_404(File, share_link=token)

    file_path = file_obj.file.path

    if not os.path.exists(file_path):
        return Response({"detail": "File not found"}, status=status.HTTP_410_GONE)

    file_obj.last_download_at = timezone.now()
    file_obj.save(update_fields=['last_download_at'])
    logger.info(f"User {request.user.username} downloaded shared file {file_obj.original_name} from {file_obj.user.username} directory")

    return FileResponse(
      open(file_path, 'rb'),
      as_attachment=True,
      filename=file_obj.original_name
    )
  
class ShareFileDetailView(APIView):
  permission_classes = [permissions.AllowAny]

  def get(self, request, token):
    file_obj = get_object_or_404(File, share_link=token)

    serializer = FileSerializer(
      file_obj,
      context={'request': request}  
    )

    return Response(serializer.data)