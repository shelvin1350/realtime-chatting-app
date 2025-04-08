from django.db import models
from django.contrib.auth.models import User

class ChatRoom(models.Model):
    users = models.ManyToManyField(User, related_name='chat_rooms')
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recieved_messages')
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)