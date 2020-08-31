from django.test import TestCase
from api.models import Game, Field
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from api.serializers import GameSerializer
import json


client = APIClient()

def get_loggen_in():
    user = User.objects.create(username='Test')
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)


class UserCreateTest(TestCase):
    def setUp(self):
        self.user_data = {'username':'test', 'password':'test'}
        u = User.objects.create(username='Test')
        u.set_password('Test')
        u.save()

    def test_user_create(self):
        resp = client.post('/users/create/',self.user_data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
    
    def test_user_already_exists(self):
        resp = client.post('/users/create/',{
            'username': 'Test',
            'password': 'Test'
        })
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

class UserAuthTest(TestCase):
    def setUp(self):
        u = User.objects.create(username='Test')
        u.set_password('Test')
        u.save()
        self.test_user = u

    def test_user_login_success(self):
        resp = client.post('/users/login/',{
            'username': 'Test',
            'password': 'Test'
        })
        token = Token.objects.get(user=self.test_user)
        data = json.loads(resp.content)
        self.assertEqual(data['token'], token.key)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
    
    def test_user_login_fail(self):
        resp = client.post('/users/login/',{
            'username': 'Test',
            'password': 'not_a_valid_password'
        })
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_user_already_logged_in(self):
        Token.objects.create(user=User.objects.get(username='Test'))
        resp = client.post('/users/login/',{
            'username': 'Test',
            'password': 'Test'
        })
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

class GameTest(TestCase):
    def setUp(self):
        get_loggen_in()
        self.test_game = Game.objects.create(size=10)
        for i in range(11, 16):
            Game.objects.create(size=i)
    
    def test_get_game_list(self):
        resp = client.get('/games/')
        data = json.loads(resp.content)
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        self.assertEqual(data, serializer.data)
    
    def test_get_game(self):
        game = self.test_game
        resp = client.get(f'/games/{game.id}/')
        serializer = GameSerializer(game)
        data = json.loads(resp.content)
        self.assertEqual(data, serializer.data)
    
    def test_join_available_game(self):
        game = self.test_game
        resp = client.post(f'/games/{game.id}/join/')
        data = json.loads(resp.content)
        self.assertEqual(data['room_id'], game.id)
    
    def test_join_not_available_game(self):
        game = self.test_game
        game.status = 'preparing'
        game.save()
        resp = client.post(f'/games/{game.id}/join/')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_game_create(self):
        resp = client.post('/games/create/', {'size': 10})
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
    
    def test_game_create_fail(self):
        resp = client.post('/games/create/')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

class StatisticTest(TestCase):
    def setUp(self):
        get_loggen_in()
        self.test_game = Game.objects.create(size=10)
        self.test_user = User.objects.get(username='Test')
        Field.objects.create(game=self.test_game, user=self.test_user)
    
    def test_user_statistic(self):
        fields = Field.objects.filter(
            game__in=Game.objects.filter(status='ended'),
            user=self.test_user,
        )
        statistic_data = {
            "username": self.test_user.username,
            "games_count": len(fields),
            "wins_count": len(fields.filter(has_ships=True))
        }
        resp = client.get('/users/stat/')
        resp_data = json.loads(resp.content)
        self.assertEqual(statistic_data, resp_data)
