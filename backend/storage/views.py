from django.http import FileResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, File
from .serializers import FileSerializer
import os
from django.shortcuts import get_object_or_404

class IsAdmin(permissions.BasePermission):
  def has_permission(self, request, view):
    return bool(
      request.user and 
      request.user.is_authenticated and 
      request.user.is_admin
    )

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

    return FileResponse(
      open(file_path, 'rb'),
      as_attachment=True,
      filename=file_obj.name
    )
  
class FilesListByUserView(APIView):
  permission_classes = [IsAdmin]

  def post(self, request):
    username = request.data.get('username')

    if not username:
      return Response({
        "error": "Username is required."
      }, status=status.HTTP_400_BAD_REQUEST)

    try:
      user = User.objects.get(username=username)
    except User.DoesNotExist:
      return Response({
        "error": "User not found."
      }, status=status.HTTP_404_NOT_FOUND)
    
    files = File.objects.filter(user=user)

    serializer = FileSerializer(files, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
