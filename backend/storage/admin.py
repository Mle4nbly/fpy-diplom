from django.contrib import admin
from .models import File

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('original_name', 'user', 'size', 'uploaded_at', 'share_link')