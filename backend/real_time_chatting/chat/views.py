from rest_framework import generics, permissions
from .models import Message
from .serializer import MessageSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer


class MessageListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        sender_id = request.query_params.get('sender_id')
        reciever_id = request.query_params.get('reciever_id')

        if not sender_id or not reciever_id:
            return Response({"error": "sender_id and reciever_id are required"}, status=400)

        messages = Message.objects.filter(
            sender_id__in=[sender_id, reciever_id],
            reciever_id__in=[sender_id, reciever_id]
        ).order_by('timestamp')

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

class MessageCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        sender = request.user  # Get the sender from the authenticated user
        receiver_id = request.data.get('reciever_id')
        text = request.data.get('text')

        if not receiver_id or not text:
            return Response({"error": "reciever_id and text are required"}, status=400)

        # Check if sender and receiver are the same
        if sender.id == int(receiver_id):
            return Response({"error": "Sender and receiver cannot be the same"}, status=400)

        try:
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response({"error": "Receiver not found"}, status=404)

        message = Message.objects.create(
            sender=sender,
            reciever=receiver,
            text=text
        )
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=201)


class MarkAsReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        reciever_id = request.data.get('reciever_id')
        if not reciever_id:
            return Response({"error": "reciever_id required"}, status=400)

        messages = Message.objects.filter(sender_id=reciever_id, reciever=request.user, is_read=False)
        count = messages.count()
        messages.update(is_read=True)

        return Response({"message": f"{count} messages marked as read."})


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer



class UserListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.exclude(id=request.user.id)  # Exclude current user
        data = [{"id": user.id, "username": user.username} for user in users]
        return Response(data)
    
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer