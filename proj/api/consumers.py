from channels.generic.websocket import AsyncWebsocketConsumer
from channels.auth import login
import json
from api.models import Game

from asgiref.sync import sync_to_async


@sync_to_async
def is_available(id):
    g = Game.objects.get(id=id)
    return g.status == 'available'

@sync_to_async
def is_member(game_id, user):
    g = Game.objects.get(id=game_id)
    return g.field_set.filter(user=user).first()


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']

        if (await is_member(self.room_id, self.scope['user'])):
            await self.channel_layer.group_add(
                    self.room_id, self.channel_name
                )
            await self.accept()
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_id, self.channel_name
        )
    
    async def receive(self, text_data):
        parsed_data = json.loads(text_data)

        await self.channel_layer.group_send(
            self.room_id,{
                "type" : "game.message",
                "sender" : self.scope['user'].username,
                "message" : parsed_data['message'],
        })
    
    async def game_message(self, event):
        #message = event['message']
        await self.send(text_data=json.dumps({
            "sender" : event["sender"],
            "message" : event["message"],
        }))