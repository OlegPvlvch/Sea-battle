from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, logout
from .serializers import UserSerializer
from .models import UserStatistic


class UserCreateView(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

class LoginView(APIView):
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({"Token": user.auth_token.key})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request,):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class StatisticView(APIView):
    def get(self, request,):
        user_stat = UserStatistic.objects.get(user=request.user)
        return Response({
            "user": request.user.username,
            "games_count": user_stat.games_count,
            "wins_count": user_stat.wins_count
        })

    def put(self, request,):
        pass
