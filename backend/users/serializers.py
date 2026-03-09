from rest_framework import serializers
from .models import User
import re
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password', 'email', 'full_name', 'is_admin']
    read_only_fields = ['is_admin']
    extra_kwargs = {
      'password': {
        'write_only': True
      }
    }

  def validate_username(self, value):
    if not re.match(r'^[a-zA-Z][a-zA-Z0-9]{3,19}$', value):
      raise serializers.ValidationError(
        "Username должен содержать 4-20 символов и только буквы и цифры"
      )

    return value
  
  def validate_password(self, value):
    try:
        validate_password(value)
    except ValidationError as e:
        raise serializers.ValidationError(e.messages)

    return value

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
