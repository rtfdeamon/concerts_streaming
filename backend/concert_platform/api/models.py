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

# Create your models here.
class ExtendedUser(models.Model):
    id = models.IntegerField(name='id', primary_key=True)
    role = models.CharField(max_length=40, null=False, default=UserRole.VIEWER)

class Concert(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user_id = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=True, blank=False, parent_link='concerts')
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    date = models.DateTimeField()
    slots = models.IntegerField()
    # poster_url = models.URLField()