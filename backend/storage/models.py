from django.db import models
from users.models import User
import uuid
import os

def user_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    unique_name = f"{uuid.uuid4()}.{ext}"

    return f"uploads/{instance.user.username}/{unique_name}"


class File(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  file = models.FileField(upload_to=user_directory_path)
  original_name = models.CharField(max_length=255)
  stored_name = models.CharField(max_length=255, editable=False)
  size = models.BigIntegerField()
  uploaded_at = models.DateTimeField(auto_now_add=True)

  def save(self, *args, **kwargs):
    if not self.pk:
        self.original_name = self.file.name.split('/')[-1] 
        self.stored_name = os.path.basename(self.file.name)
        self.size = self.file.size
    super().save(*args, **kwargs)

  def __str__(self):
    return self.original_name