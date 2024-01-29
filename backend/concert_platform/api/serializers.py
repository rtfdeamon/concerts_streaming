from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import empty
from .models import Concert, ExtendedUser

"""
class ExtendedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        depth = 1
        fields = '__all__'
"""

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
        print(args, kwargs)
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
    
    def run_validation(self, data):
        try:
            User.objects.get(id=data['id'])
            return data
        except User.DoesNotExist as e:
            raise serializers.ValidationError('Base user does not exist')
    
    def create(self, data):
        return ExtendedUser.objects.create(**data)