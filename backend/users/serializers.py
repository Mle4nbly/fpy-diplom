from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  is_admin = serializers.BooleanField(read_only=True)

  class Meta:
    model = User
    fields = ['id', 'full_name', 'username', 'password', 'email', 'is_admin']

  def create(self, validated_data):
    password = validated_data.pop('password') 
    user = User(**validated_data) 
    user.set_password(password) 
    user.save() 
    
    return user
  
class UserListSerializer(serializers.ModelSerializer):
  files_count = serializers.IntegerField(read_only=True)
  total_size = serializers.IntegerField(read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'files_count', 'total_size', 'is_admin']