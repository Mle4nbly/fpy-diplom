from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'password', 'email', 'full_name', 'is_admin']
    read_only_fields = ['is_admin']

  def create(self, validated_data):
    password = validated_data.pop('password') 
    user = User(**validated_data) 
    user.set_password(password) 
    user.save() 
    
    return user

class UserAdminSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'full_name', 'email', 'is_admin']
    read_only_fields = ['username', 'email', 'password']

class UserMeSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'full_name', 'email', 'is_admin']
    read_only_fields = ['is_admin']

class UserListSerializer(serializers.ModelSerializer):
  files_count = serializers.IntegerField(read_only=True)
  total_size = serializers.IntegerField(read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'full_name', 'email', 'files_count', 'total_size', 'is_admin']
    read_only_fields = ['id', 'username', 'full_name', 'email', 'files_count', 'total_size', 'is_admin']

class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField(write_only=True)
