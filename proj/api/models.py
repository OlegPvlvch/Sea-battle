from django.db import models
from django.contrib.auth.models import User


class UserStatistic(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE,
        primary_key=True
    )
    games_count = models.IntegerField(default=0)
    wins_count = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username + '. Statistic'
