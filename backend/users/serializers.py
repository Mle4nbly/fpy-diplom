from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = ['username', 'full_name', 'password', 'email']

  def create(self, validated_data):
    password = validated_data.pop('password') 
    user = User(**validated_data) 
    user.set_password(password) 
    user.storage_path = f"/storage/{user.username}" 
    user.save() 
    
    return user