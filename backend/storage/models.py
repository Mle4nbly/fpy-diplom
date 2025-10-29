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
  name = models.CharField(max_length=255)
  description = models.TextField(max_length=255, null=True)
  uploaded_at = models.DateTimeField(auto_now_add=True, editable=False)
  size = models.BigIntegerField(editable=False)

  def save(self, *args, **kwargs):
    self.size = self.file.size
    super().save()

  def __str__(self):
    return self.name