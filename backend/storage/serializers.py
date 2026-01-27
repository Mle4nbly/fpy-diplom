from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
  url = serializers.SerializerMethodField()

  class Meta:
        model = File
        fields = [
            'id',
            'original_name',
            'description',
            'uploaded_at',
            'last_download_at',
            'size',
            'share_link',
            'url',
            'file'
        ]
        read_only_fields = [
            'id',
            'uploaded_at',
            'last_download_at',
            'size',
            'share_link',
            'url',
        ]

  def get_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url