import uuid
from django.db import models
#from django.contrib.auth.models import User

class UserRole(models.TextChoices):
    ADMINISTRATOR = 'administrator'
    ORGANIZER = 'organizer'
    ARTIST = 'artist'
    VIEWER = 'viewer'
    SPONSOR = 'sponsor'

class ConcertStatus(models.TextChoices):
    SCHEDULED = 'scheduled'
    LIVE = 'live'
    FINISHED = 'finished'

class ArtistSessionStatus(models.TextChoices):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

# Create your models here.
class ExtendedUser(models.Model):
    id = models.IntegerField(name='id', primary_key=True)
    name = models.CharField(max_length=200, default='User')
    role = models.CharField(max_length=40, null=False, default=UserRole.VIEWER)
    avatar_url = models.URLField(null=True)
    subscribers = models.ManyToManyField('self', through='ArtistSubscription', through_fields=('artist', 'user'))
    artists_followed = models.ManyToManyField('self', through='ArtistSubscription', through_fields=('user', 'artist'))
    concerts_followed = models.ManyToManyField('Concert', through='ConcertSubscription', through_fields=('user', 'concert'))

class Concert(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user_id = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=True, blank=False, related_name='concert_admin')
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    date = models.DateTimeField()
    slots = models.IntegerField()
    poster_url = models.URLField(null=True)
    status = models.CharField(max_length=20, null=False, choices=ConcertStatus.choices, default=ConcertStatus.SCHEDULED)
    category = models.CharField(max_length=200, null=True)
    subscribers = models.ManyToManyField(ExtendedUser, through='ConcertSubscription', through_fields=('concert', 'user'), related_name='concert_subscribers')

class ArtistSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=True, blank=False, parent_link='sessions')
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, null=True, blank=True, parent_link='sessions')
    status = models.CharField(max_length=20, choices=ArtistSessionStatus.choices, default=ArtistSessionStatus.PENDING)
    stream_key = models.CharField(max_length=200, null=True)
    artist_demo_url = models.CharField(max_length=2048, null=True)

class ConcertSubscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=False, related_name='concert_subscriptions')
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, null=False, related_name='user_subscriptions')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'concert'],
                name='concert_subscription_unique'
            )
        ]

class ArtistSubscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(ExtendedUser, related_name='artist_subscriptions', on_delete=models.CASCADE, null=False)
    artist = models.ForeignKey(ExtendedUser, related_name='followers', on_delete=models.CASCADE, null=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'artist'],
                name='artist_subscription_unique'
            )
        ]

class RefreshToken(models.Model):
    token = models.CharField(max_length=64, primary_key=True)
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=False)
    expire_at = models.BigIntegerField(null=False)
    session_id = models.UUIDField(null=False, default=uuid.uuid4)
