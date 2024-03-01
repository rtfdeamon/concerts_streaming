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

class ConcertAccess(models.TextChoices):
    FREE = 'free'
    PAID = 'paid'

class ArtistSessionStatus(models.TextChoices):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

class ConcertAdStatus(models.TextChoices):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

class ConcertTicketStatus(models.TextChoices):
    ISSUED = 'issued'
    ACTIVATED = 'activated'

# Create your models here.
class ExtendedUser(models.Model):
    id = models.IntegerField(name='id', primary_key=True)
    name = models.CharField(max_length=200, default='User')
    description = models.TextField(default='')
    role = models.CharField(max_length=40, null=False, default=UserRole.VIEWER)
    avatar_url = models.URLField(null=True)
    artist_genre = models.CharField(max_length=200, null=True)
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
    performance_time = models.IntegerField(default=15)
    access = models.CharField(max_length=20, null=False, choices=ConcertAccess.choices, default=ConcertAccess.PAID)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    subscribers = models.ManyToManyField(ExtendedUser, through='ConcertSubscription', through_fields=('concert', 'user'), related_name='concert_subscribers')
    # artists = models.ManyToManyField(ExtendedUser, through='ArtistSession', through_fields=('concert', 'user'), related_name='concert_artists')

class ArtistSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=True, blank=False, related_name='performances', parent_link=True)
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, null=True, blank=True, related_name='performances', parent_link=True)
    status = models.CharField(max_length=20, choices=ArtistSessionStatus.choices, default=ArtistSessionStatus.PENDING)
    stream_key = models.CharField(max_length=200, null=True)
    artist_demo_url = models.CharField(max_length=2048, null=True)

class ConcertSubscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
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
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(ExtendedUser, related_name='artist_subscriptions', on_delete=models.CASCADE, null=False)
    artist = models.ForeignKey(ExtendedUser, related_name='followers', on_delete=models.CASCADE, null=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'artist'],
                name='artist_subscription_unique'
            )
        ]

class SponsorAd(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(ExtendedUser, related_name='ads', on_delete=models.CASCADE, parent_link=True)
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, related_name='ads', parent_link=True, unique=True)
    banner_url = models.CharField(max_length=2048)
    status = models.CharField(max_length=20, choices=ConcertAdStatus.choices, default=ConcertAdStatus.PENDING)

class ConcertTicket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, related_name='ticket', parent_link=True)
    user = models.ForeignKey(ExtendedUser, related_name='tickets', on_delete=models.CASCADE, parent_link=True)
    status = models.CharField(max_length=20, choices=ConcertTicketStatus.choices, default=ConcertTicketStatus.ISSUED)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'concert'],
                name='concert_ticket_unique'
            )
        ]

class RefreshToken(models.Model):
    token = models.CharField(max_length=64, primary_key=True)
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE, null=False)
    expire_at = models.BigIntegerField(null=False)
    session_id = models.UUIDField(null=False, default=uuid.uuid4)