from rest_framework import views, generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, GameSerializer
from .models import Game, Field
from .helpers import getEmptyField


class UserCreateView(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

class LoginView(views.APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            try:
                Token.objects.create(user=user)
            except:
                return Response(status=status.HTTP_403_FORBIDDEN)
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
        fields = Field.objects.filter(
            game__in=Game.objects.filter(status='ended'),
            user=request.user,
        )
        return Response({
            "username": request.user.username,
            "games_count": len(fields),
            "wins_count": len(fields.filter(has_ships=True))
        })

class GameListView(generics.ListAPIView):
    serializer_class = GameSerializer
    model = serializer_class.Meta.model

    def get_queryset(self):
        queryset = self.model.objects.filter(status="available")
        return queryset
        
class UserGameListView(generics.ListAPIView):
    pass

class GameCreateView(views.APIView):
    def post(self, request,):
        try:
            size = int(request.data.get('size'))
        except TypeError:
            return Response({
                'error':'Room needs a size'
            },status.HTTP_400_BAD_REQUEST)
        g = Game.objects.create(size=size)
        Field.objects.create(
            user=request.user, 
            game=g,
            fieldmap=getEmptyField(size)
        )
        return Response({
            "room_id" : g.id,
        }, status=status.HTTP_201_CREATED)

class GameRetrieveView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameJoinView(views.APIView):
    def post(self, request, pk,):
        g = Game.objects.get(id=pk)
        f = g.field_set.filter(user=request.user).first()
        if g.status == 'available':
            if not f:
                Field.objects.create(
                    user=request.user, 
                    game=g,
                    fieldmap=getEmptyField(g.size)
                )
                g.status = 'preparing'
                g.save()
            return Response({
                "room_id": g.id,
            })
        return Response({
            'error': 'Game is not available'
        }, status=status.HTTP_403_FORBIDDEN)