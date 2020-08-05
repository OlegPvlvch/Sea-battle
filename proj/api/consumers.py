from channels.generic.websocket import AsyncWebsocketConsumer
import json


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_room = self.scope['url_route']['kwargs']['room_name']
        #self.game_room = self.scope['user'].username
        await self.channel_layer.group_add(
            self.game_room, self.channel_name
        )
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.game_room, self.channel_name
        )
    
    async def receive(self, text_data):
        data = json.loads(text_data)

        await self.channel_layer.group_send(
            self.game_room,{
                "type" : "game.message",
                "sender" : self.scope['user'].username,
        })
    
    async def game_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            "message" : message,
        }))