from django.db import models
from users.models import User
import uuid
import os

def user_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    unique_name = f"{uuid.uuid4()}.{ext}"

    return f"{instance.user.username}/{unique_name}"


class File(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  file = models.FileField(upload_to=user_directory_path)
  original_name = models.CharField(max_length=255)
  size = models.BigIntegerField(editable=False)
  uploaded_at = models.DateTimeField(auto_now_add=True)

  def save(self, *args, **kwargs):
    self.size = self.file.size
    self.original_name = self.file.name
    super().save()

  def __str__(self):
    return self.original_name