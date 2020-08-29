from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .helpers import (
    is_member, make_move, get_fields, set_field, first_move, get_status
)


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
    
    async def get_fields_data(self, data):
        fields = await get_fields(self.room_id, self.scope['user'])
        await self.send(text_data=json.dumps({
            'action':'get_fields_data',
            'player_field':fields['player_field'],
            'enemy_field':fields['enemy_field'],
        }))

    async def set_field(self, data):
        await set_field(self.room_id, self.scope['user'], data['fieldmap'])
        if await get_status(self.room_id) == 'started':
            await self.start_game()
        await self.send_action_message('set_field')
    
    async def move(self, data):
        move_data = await make_move(self.room_id, self.scope['user'], data)
        await self.send_action_message('move')
        if move_data['is_won']:
            await self.end_game()
    
    async def start_game(self):
        await first_move(self.room_id)
        await self.send_action_message('move')
    
    async def end_game(self):
        await self.send_action_message('end_game')
    
    commands = {
        'get_fields_data': get_fields_data,
        'set_field': set_field,
        'move': move,
    }
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.commands[data['command']](self, data)
    
    async def send_action_message(self, action, info={}):
        await self.channel_layer.group_send(
            self.room_id,{
                "type":"action.message",
                "action":action,
                "sender":self.scope['user'].username,
                "info":info,
            }
        )
    
    async def action_message(self, event):
        await self.send(text_data=json.dumps({
            "action": event["action"],
            "sender" : event["sender"],
            "info" : event["info"],
        }))