from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserStatistic


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        UserStatistic.objects.create(user=user)
        return user

# class UserStatisticSerializer(serializers.ModelSerializer):
#     user = serializers.ReadOnlyField(source='user.username')
#     class Meta:
#         model = UserStatistic
#         fields = ('user', 'games_count', 'wins_count')