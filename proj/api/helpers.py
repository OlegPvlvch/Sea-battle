from api.models import Game
from asgiref.sync import sync_to_async


@sync_to_async
def is_member(game_id, user):
    g = Game.objects.get(id=game_id)
    return g.field_set.filter(user=user).first()

@sync_to_async
def get_fields(game_id, user):
    g = Game.objects.get(id=game_id)
    player_field = g.field_set.get(user=user).fieldmap
    hidden_enemy_field = getEmptyField(g.size)
    try:
        real_enemy_field = g.field_set.all().exclude(user=user).first().fieldmap
        for i in range(g.size):
            for j in range(g.size):
                if real_enemy_field[i][j]['shot']:
                    hidden_enemy_field[i][i] = real_enemy_field[i][j]
    except:
        pass

    return {
        'player_field': player_field,
        'enemy_field': hidden_enemy_field,
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