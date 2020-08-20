from proj.middlewares import TokenAuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from api import consumers


application = ProtocolTypeRouter({
    'websocket' : TokenAuthMiddlewareStack(
        URLRouter([
            re_path(r'^ws/(?P<room_id>[^/]+)/$', consumers.GameConsumer),
        ])
    ),
})