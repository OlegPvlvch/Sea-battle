from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField


class Game(models.Model):
    STATUS_CHOICES = (
        ('available', 'available'),
        ('preparing', 'preparing'),
        ('started', 'started'),
        ('ended', 'ended'),
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='available',
    )
    size = models.IntegerField(default=10)

class Field(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    has_ships = models.BooleanField(default=False)
    can_move = models.BooleanField(default=False)
    fieldmap = JSONField(default=list)