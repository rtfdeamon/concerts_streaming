from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView, Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.conf import settings
import datetime
import jwt
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .models import ExtendedUser, Concert, UserRole
from .serializers import ConcertReadSerializer, ConcertWriteSerializer, ExtendedUserSerializer
from utils.serializers import ReadWriteSerializerViewSetMixin
from utils.authentication import JwtAuthentication
    
class UserViewSet(ModelViewSet):
    queryset = ExtendedUser.objects.all()
    serializer_class = ExtendedUserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JwtAuthentication]

class ConcertsViewSet(ReadWriteSerializerViewSetMixin, ModelViewSet):
    queryset = Concert.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JwtAuthentication]
    read_serializer_class = ConcertReadSerializer
    write_serializer_class = ConcertWriteSerializer

sign_in_request_dto = openapi.Schema(
    type='object',
    properties={
        'user': openapi.Schema(type='string'),
        'password': openapi.Schema(type='string')
    }
)
sign_in_response_dto = openapi.Schema(
    type='object',
    properties={
        'token': openapi.Schema(type='string'),
    }
)
sign_up_request_dto = openapi.Schema(
    type='object',
    properties={
        'user': openapi.Schema(type='string'),
        'password': openapi.Schema(type='string'),
        'email': openapi.Schema(type='string')
    }
)

class SignInView(APIView):
    @swagger_auto_schema(request_body=sign_in_request_dto, responses={'200': sign_in_response_dto})
    def post(self, request):
        username = request.data['user']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        now = datetime.datetime.utcnow()
        token = jwt.encode({
            'sub': user.id,
            'iat': int(now.timestamp()),
            'exp': int(now.timestamp() + settings.JWT_TTL)
        }, key=settings.SECRET_KEY)
        return Response({
            'token': token
        })

class SignUpView(APIView):
    def post(self, request):
        username = request.data['user']
        email = request.data['email']
        password = request.data['password']
        base_user = User.objects.create_user(username, email, password)
        user = ExtendedUser.objects.create(id=base_user.id, role=UserRole.ADMINISTRATOR.value)
        user_serializer = ExtendedUserSerializer(user)
        return Response(user_serializer.data)
