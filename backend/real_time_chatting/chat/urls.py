from django.urls import path
from .views import MessageListView, MessageCreateView, RegisterView, MarkAsReadView, UserListView
from django.urls import path


urlpatterns = [
    path('messages/', MessageListView.as_view(), name='message-list'),
    path('messages/create/', MessageCreateView.as_view(), name='message-create'),
    path('messages/mark-read/', MarkAsReadView.as_view(), name='message-mark-read'),
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
]
