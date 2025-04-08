from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    reciever = UserSerializer(read_only=True)  # Ensure your model also uses 'reciever' (not 'receiver')

    class Meta:
        model = Message  # ✅ Use '=' instead of ':'
        fields = ['id', 'sender', 'reciever', 'text', 'timestamp', 'is_read']

