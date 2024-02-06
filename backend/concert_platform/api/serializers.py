from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.utils import model_meta
from .models import ArtistSession, Concert, ExtendedUser

"""
class ExtendedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        depth = 1
        fields = '__all__'
"""

class ArtistSessionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistSession
        depth = 1
        fields = '__all__'

class ArtistSessionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistSession
        exclude = ('user', 'concert' )

class ConcertReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        depth = 1
        fields = '__all__'

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

class ExtendedUserSerializer(serializers.BaseSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def to_representation(self, instance: ExtendedUser):
        user = UserSerializer(User.objects.get(id=instance.id))
        result = {
            'id': instance.id,
            'role': instance.role,
            'user': user.data
        }
        return result
    
    def to_internal_value(self, data):
        return {
            'id': data['id'],
            'role': data['role']
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