from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.utils import model_meta
from drf_yasg.utils import swagger_serializer_method
from .schemas import user_response_dto
from .models import ArtistSession, ArtistSessionStatus, ArtistSubscription, ChatMessage, Concert, ConcertSubscription, ConcertTicket, ExtendedUser, SponsorAd

"""
class ExtendedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        depth = 1
        fields = '__all__'
"""

class ExtendedUserSerializer(serializers.Serializer):
    class Meta:
        swagger_schema_fields = user_response_dto

    def __init__(self, *args, **kwargs):
        self.expand_relations = kwargs.pop('expand', True)
        self.expand_private = kwargs.pop('private', False)
        super().__init__(*args, **kwargs)
    
    def to_representation(self, instance: ExtendedUser):
        user = UserSerializer(User.objects.get(id=instance.id))
        result = {
            'id': instance.id,
            'role': instance.role,
            'name': instance.name,
            'description': instance.description,
            'avatar_url': instance.avatar_url,
            'artist_genre': instance.artist_genre,
            'username': user.data['username'],
        }
        if self.expand_relations:
            result['followers'] = ExtendedUserSerializer(
                instance=instance.subscribers.all(),
                many=True,
                expand=False
            ).data
            result['artists_followed'] = ExtendedUserSerializer(
                instance=instance.artists_followed.all(),
                many=True,
                expand=False
            ).data
            result['concerts_followed'] = ConcertWriteSerializer(
                instance=instance.concerts_followed.all(),
                many=True
            ).data
            result['concerts'] = ConcertReadSerializer(
                instance=Concert.objects.filter(performances__user_id=instance.id, performances__status=ArtistSessionStatus.ACCEPTED.value),
                many=True,
                context=self._context,
            ).data
            if self.expand_private:
                result['performances'] = ArtistSessionReadSerializer(
                    instance=instance.performances.all(),
                    many=True,
                ).data
                result['ads'] = ConcertAdReadSerializer(
                    instance=instance.ads.all(),
                    many=True
                ).data
                result['tickets'] = ConcertTicketReadSerializer(
                    instance=instance.tickets.all(),
                    many=True
                ).data
        return result
    
    def to_internal_value(self, data):
        return {
            'id': data['id'],
            'name': data['name'],
            'role': data['role'],
            'description': data['description'],
            'artist_genre': data['artist_genre'],
            'avatar_url': data['avatar_url']
        }
    
    def run_validation(self, data, *args, **kwargs):
        try:
            if self.instance is None:
                User.objects.get(id=data['id'])
            return data
        except User.DoesNotExist as e:
            raise serializers.ValidationError('Base user does not exist')
    
    def create(self, data):
        return ExtendedUser.objects.create(**data)
    
    def update(self, instance, validated_data):
        extended_fields = model_meta.get_field_info(instance).fields
        
        for attr, value in validated_data.items():
            if attr in extended_fields:
                setattr(instance, attr, value)
        instance.save()
        return instance


class NestedConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        exclude = ('subscribers', )

class ArtistSessionReadSerializer(serializers.ModelSerializer):
    concert = serializers.SerializerMethodField()
    class Meta:
        model = ArtistSession
        depth = 1
        fields = '__all__'

    @swagger_serializer_method(serializer_or_field=NestedConcertSerializer)
    def get_concert(self, item):
        if item.concert:
            return NestedConcertSerializer(item.concert).data
        return None

class ArtistSessionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistSession
        exclude = ('status', 'stream_key')

class ArtistSessionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistSession
        exclude = ('concert', 'user', 'stream_key')

class ConcertAdReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SponsorAd
        depth = 1
        fields = '__all__'

class ConcertAdCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SponsorAd
        exclude = ('status', )

class ConcertAdUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SponsorAd
        exclude = ('concert', 'user')

class ConcertTicketReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertTicket
        depth = 1
        fields = '__all__'

class ConcertTicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertTicket
        exclude = ('status', )

class ArtistSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistSubscription
        fields = '__all__'

class ConcertSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertSubscription
        fields = '__all__'

class ConcertReadSerializer(serializers.ModelSerializer):
    ticket = serializers.SerializerMethodField()
    artists = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=ConcertTicketReadSerializer)
    def get_ticket(self, instance):
        # NOTE: requires optimization probably
        request = self.context.get('request')
        tickets = ConcertTicket.objects.all().filter(user_id=request.user.id)
        return ConcertTicketReadSerializer(instance=tickets, many=True).data

    @swagger_serializer_method(serializer_or_field=ExtendedUserSerializer)
    def get_artists(self, instance):
        artists = ExtendedUser.objects.all().filter(performances__concert_id=instance.id, performances__status=ArtistSessionStatus.ACCEPTED.value)
        return ExtendedUserSerializer(instance=artists, many=True, expand=False).data

    class Meta:
        model = Concert
        depth = 1
        fields = [
            'id',
            'created_at',
            'user_id',
            'name',
            'description',
            'date',
            'slots',
            'poster_url',
            'ticket_price',
            'status',
            'category',
            'performance_time',
            'access',
            'subscribers',
            'performances',
            'ads',
            'ticket',
            'artists',
        ]

class ConcertWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = '__all__'
    
    def to_internal_value(self, data):
        request = self.context.get('request')
        data['user_id'] = request.user.id
        return super().to_internal_value(data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email'
        ]

class OrderCreateSerializer(serializers.Serializer):
    ticket_id = serializers.UUIDField()

class OrderCaptureSerializer(serializers.Serializer):
    order_id = serializers.CharField()

class ChatMessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    text = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    @swagger_serializer_method(ExtendedUserSerializer)
    def get_sender(self, instance):
        return ExtendedUserSerializer(instance=instance.user, expand=False).data
    
    @swagger_serializer_method(serializers.CharField)
    def get_text(self, instance: ChatMessage):
        return instance.message

    @swagger_serializer_method(serializers.IntegerField)
    def get_date(self, instance: ChatMessage):
        return instance.created_at.timestamp()

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'text', 'date']