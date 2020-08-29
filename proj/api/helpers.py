from api.models import Game
from asgiref.sync import sync_to_async
import random as rand


def get_game(game_id):
    return Game.objects.get(id=game_id)

def has_alive_ships(fieldmap):
    size = range(len(fieldmap))
    for i in size:
        for j in size:
            if fieldmap[i][j]['containsShip'] and not fieldmap[i][j]['shot']:
                return True
    return 

@sync_to_async
def first_move(game_id):
    fields = get_game(game_id).field_set.all()
    first_move_field = rand.choice(fields)
    first_move_field.can_move = True
    first_move_field.save()

@sync_to_async
def make_move(game_id, user, data):
    g = get_game(game_id)
    i = data['coords']['i']
    j = data['coords']['j']
    player_field = g.field_set.get(user=user)
    enemy_field = g.field_set.exclude(user=user).first()
    is_won = False
    try:
        enemy_field.fieldmap[i][j]['shot'] = True
        if enemy_field.fieldmap[i][j]['containsShip']:
            player_field.can_move = True
            enemy_field.can_move = False
        else:
            player_field.can_move = False
            enemy_field.can_move = True
        is_won = not has_alive_ships(enemy_field.fieldmap)
        if is_won:
            g.status = 'ended'
            g.save()
            enemy_field.has_ships = False
        enemy_field.save()
        player_field.save()
    except AttributeError:
        pass
    return {'is_won':is_won}

@sync_to_async
def is_member(game_id, user):
    g = get_game(game_id)
    return g.field_set.filter(user=user).first()

@sync_to_async
def get_status(game_id):
    return get_game(game_id).status

@sync_to_async
def set_field(game_id, user, fieldmap):
    g = get_game(game_id)
    f = g.field_set.filter(user=user).first()
    f.fieldmap = fieldmap
    f.has_ships = True
    f.save()
    field_set = g.field_set.all()
    if len(field_set) > 1 and all([f.has_ships for f in field_set]):
        g.status = 'started'
        g.save()

@sync_to_async
def get_fields(game_id, user):
    g = get_game(game_id)
    game_size = g.size
    player_field = g.field_set.get(user=user)
    hidden_enemy_fieldmap = getEmptyField(game_size)
    try:
        real_enemy_fieldmap = g.field_set.exclude(user=user).first().fieldmap
        for i in range(game_size):
            for j in range(game_size):
                if real_enemy_fieldmap[i][j]['shot']:
                    hidden_enemy_fieldmap[i][j] = real_enemy_fieldmap[i][j]
    except AttributeError:
        pass
    
    return {
        'player_field': {
            'has_ships': player_field.has_ships,
            'player_fieldmap': player_field.fieldmap,
            'can_move': player_field.can_move,
        },
        'enemy_field':{
            'enemy_fieldmap': hidden_enemy_fieldmap
        }
    }

def getEmptyField(size):
    field = list()
    for i in range(size):
        field.append([])
        for j in range(size):
            field[i].append({
                'x': i,
                'y': j,
                'containsShip': False,
                'isVisible': False,
                'isOccupied': False,
                'shot': False,
            })
    return field