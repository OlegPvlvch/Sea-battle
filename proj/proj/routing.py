from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path, path
from api import consumers


application = ProtocolTypeRouter({
    'websocket' : AuthMiddlewareStack(
        URLRouter([
            #path('ws/<str:room_name>/', consumers.GameConsumer),
            re_path(r'^ws/(?P<room_name>[^/]+)/$', consumers.GameConsumer),
        ])
    ),
})