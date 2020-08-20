from channels.generic.websocket import AsyncWebsocketConsumer
import json
from api.models import Game
from asgiref.sync import sync_to_async
from .helpers import is_member, get_fields


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']

        if await is_member(self.room_id, self.scope['user']):
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
    
    async def get_fields_data(self, room_id):
        fields = await get_fields(self.room_id, self.scope['user'])
        await self.send(text_data=json.dumps({
            'action':'get_fields_data',
            'player_field':fields['player_field'],
            'enemy_field':fields['enemy_field'],
        }))

    async def send_data(self, data):
        await self.channel_layer.group_send(
            self.room_id,{
                "type": "game.message",
                "sender": self.scope["user"].username,
                "data": data,
            }
        )

    commands = {
        'get_fields_data': get_fields_data,
        'send_data': send_data,
    }
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.commands[data['command']](self, data)
        
        # await self.send(text_data=json.dumps({
        #     'ssss':'sss'
        # }))
    
    async def game_message(self, event):
        await self.send(text_data=json.dumps({
            "sender" : event["sender"],
            "data" : event["data"],
        }))