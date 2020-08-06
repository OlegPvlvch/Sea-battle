from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField


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

class Game(models.Model):
    STATUS_CHOICES = (
        ('av', 'available'),
        ('st', 'started'),
        ('en', 'ended'),
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='is_av',
    )
    size = models.IntegerField(default=10)

class Field(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    fieldmap = ArrayField(ArrayField(JSONField()))