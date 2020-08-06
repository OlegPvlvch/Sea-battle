from rest_framework import views, generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, logout
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, GameSerializer
from .models import UserStatistic, Game, Field


class UserCreateView(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

class LoginView(views.APIView):
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            Token.objects.create(user=user)
            return Response({
                "user": user.username,
                "token": user.auth_token.key,
            })
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    def post(self, request,):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class StatisticView(views.APIView):
    def get(self, request,):
        user_stat = UserStatistic.objects.get(user=request.user)
        return Response({
            "username": user_stat.user.username,
            "games_count": user_stat.games_count,
            "wins_count": user_stat.wins_count
        })

class GameListView(generics.ListAPIView):
    serializer_class = GameSerializer
    model = serializer_class.Meta.model

    def get_queryset(self):
        queryset = self.model.objects.filter(status="is_av")
        return queryset

class GameCreateView(views.APIView):
    def post(self, request,):
        size = request.data.get('size')
        g = Game.objects.create(size=size)
        Field.objects.create(user=request.user, game=g, fieldmap=[])
        return Response({
            "room_id" : g.id,
        })

class GameRetrieveView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer