from django.http import FileResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import File
from .serializers import FileSerializer

class FileListCreateView(generics.ListCreateAPIView):
  serializer_class = FileSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    return File.objects.filter(user=self.request.user)

  def perform_create(self, serializer):
    uploaded_file = self.request.FILES['file']
    serializer.save(
      user=self.request.user,
      size=uploaded_file.size,
      original_name=uploaded_file.name
    )

class FileDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = FileSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
        print(self.request.user.is_staff)
        if self.request.user.is_staff:
            return File.objects.all()
        return File.objects.filter(user=self.request.user)
  
  def delete(self, request, pk):
    try:
      file = File.objects.get(pk=pk, user=request.user)
    except File.DoesNotExist:
      return Response({"error": "Файл не найден"}, status=status.HTTP_404_NOT_FOUND)
    
    file.file.delete(save=False)

    file.delete()

    return Response({"message": "Файл успешно удалён"}, status=status.HTTP_204_NO_CONTENT)

class FileDownloadView(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request, pk):
    try:
      file_obj = File.objects.get(pk=pk)
      if file_obj.user != request.user and not request.user.is_staff:
        return Response({"error": "Нет доступа"}, status=status.HTTP_403_FORBIDDEN)

      try:
        return FileResponse(
            open(file_obj.file.path, 'rb'),
            as_attachment=True,
            filename=file_obj.original_name
        )
      except FileNotFoundError:
        return Response(
            {"error": "Файл отсутствует на сервере"},
            status=status.HTTP_410_GONE
        )
    except File.DoesNotExist:
      return Response({"error": "Файл не найден"}, status=status.HTTP_404_NOT_FOUND)
