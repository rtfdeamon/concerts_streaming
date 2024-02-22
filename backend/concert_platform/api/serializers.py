from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.utils import model_meta
from .schemas import user_response_dto
from .models import ArtistSession, ArtistSubscription, Concert, ConcertSubscription, ExtendedUser, SponsorAd

"""
class ExtendedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        depth = 1
        fields = '__all__'
"""

class ArtistSessionReadSerializer(serializers.ModelSerializer):
    concert = serializers.SerializerMethodField()
    class Meta:
        model = ArtistSession
        depth = 1
        fields = '__all__'

    def get_concert(self, item):
        return NestedConcertSerializer(item.concert).data

class ArtistSessionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistSession
        exclude = ('status', 'stream_key')

class ConcertAdReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SponsorAd
        depth = 1
        fields = '__all__'

class ConcertAdWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SponsorAd
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
            'status',
            'category',
            'performance_time',
            'access',
            'subscribers',
            'performances',
            'ads',
        ]

class NestedConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        exclude = ('subscribers', )

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

class ExtendedUserSerializer(serializers.Serializer):
    class Meta:
        swagger_schema_fields = user_response_dto

    def __init__(self, *args, **kwargs):
        self.expand_relations = kwargs.pop('expand', True)
        print('expand', self.expand_relations)
        super().__init__(*args, **kwargs)
    
    def to_representation(self, instance: ExtendedUser):
        user = UserSerializer(User.objects.get(id=instance.id))
        result = {
            'id': instance.id,
            'role': instance.role,
            'name': instance.name,
            'description': instance.description,
            'avatar_url': instance.avatar_url,
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
            result['performances'] = ArtistSessionReadSerializer(
                instance=instance.performances.all(),
                many=True,
            ).data
            result['ads'] = ConcertAdReadSerializer(
                instance=instance.ads.all(),
                many=True
            ).data
        return result
    
    def to_internal_value(self, data):
        return {
            'id': data['id'],
            'name': data['name'],
            'role': data['role'],
            'description': data['description'],
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