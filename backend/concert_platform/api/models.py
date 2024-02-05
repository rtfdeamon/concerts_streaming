import datetime
from enum import Enum
import uuid
from django.db import models
from django.contrib.auth.models import User

class UserRole(Enum):
    ADMINISTRATOR = 'administrator'
    ORGANIZER = 'organizer'
    ARTIST = 'artist'
    VIEWER = 'viewer'

class ConcertStatus(Enum):
    SCHEDULED = 'scheduled'
    LIVE = 'live'
    FINISHED = 'finished'

# Create your models here.
class ExtendedUser(models.Model):
    id = models.IntegerField(name='id', primary_key=True)
    name = models.CharField(max_length=200, default='User')
    role = models.CharField(max_length=40, null=False, default=UserRole.VIEWER)
    avatar_url = models.URLField(null=True)

class Concert(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user_id = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=True, blank=False, parent_link='concerts')
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    date = models.DateTimeField()
    slots = models.IntegerField()
    poster_url = models.URLField(null=True)
    status = models.CharField(max_length=20, null=False, default=ConcertStatus.SCHEDULED.value)
    category = models.CharField(max_length=200, null=True)

class ArtistSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=True, blank=False, parent_link='sessions')
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, null=True, blank=True, parent_link='sessions')
    status = models.CharField(max_length=20)
