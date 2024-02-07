from urllib.parse import urlparse
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView, Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.conf import settings
import datetime
import jwt
import boto3
from uuid import uuid4
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .models import ArtistSession, ExtendedUser, Concert, UserRole
from .serializers import ArtistSessionReadSerializer, ArtistSessionWriteSerializer, ConcertReadSerializer, ConcertWriteSerializer, ExtendedUserSerializer, UserSerializer
from .schemas import sign_in_request_dto, sign_up_request_dto, sign_in_response_dto, user_response_dto, user_list_response_dto, user_create_request_dto, user_update_request_dto, concerts_query_parameters, upload_link_request_body_dto, upload_link_response_dto
from utils.serializers import ReadWriteSerializerViewSetMixin
from utils.authentication import JwtAuthentication

class UserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JwtAuthentication]

    @swagger_auto_schema(responses={'200': user_list_response_dto})
    def list(self, request):
        queryset = ExtendedUser.objects.all()
        serializer = ExtendedUserSerializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(responses={'200': user_response_dto})
    def retrieve(self, request, pk=None):
        queryset = ExtendedUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ExtendedUserSerializer(user)
        return Response(serializer.data)
    
    @swagger_auto_schema(request_body=user_create_request_dto, responses={'200': user_response_dto})
    def create(self, request, pk=None):
        username = request.data['user']
        email = request.data['email']
        role = request.data['role']
        password = request.data['password']
        base_user = User.objects.create_user(username, email, password)
        user = ExtendedUser.objects.create(id=base_user.id, role=role)
        user_serializer = ExtendedUserSerializer(user)
        return Response(user_serializer.data)
    
    @swagger_auto_schema(request_body=user_update_request_dto, responses={'200': user_response_dto})
    def update(self, request, pk=None):
        queryset = ExtendedUser.objects.all()
        instance = get_object_or_404(queryset, pk=pk)
        serializer = ExtendedUserSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        base_user = User.objects.get(id=pk)
        user_serializer = UserSerializer(instance=base_user, data=request.data, partial=True)
        user_serializer.is_valid()
        user_serializer.save()
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        queryset = ExtendedUser.objects.all()
        instance = get_object_or_404(queryset, pk=pk)
        instance.delete()
        return Response(status=204)
    
    @swagger_auto_schema(method='GET', responses={'200': user_response_dto})
    @swagger_auto_schema(method='PUT', request_body=user_update_request_dto, responses={'200': user_response_dto})
    @action(url_path='current', methods=['GET', 'PUT'], detail=False)
    def manage_current_user(self, request):
        current_user = request.user
        if request.method == 'GET':
            return self.retrieve(request, current_user.id)
        elif request.method == 'PUT':
            return self.update(request, current_user.id)


@method_decorator(name='list', decorator=swagger_auto_schema(manual_parameters=concerts_query_parameters))
class ConcertsViewSet(ReadWriteSerializerViewSetMixin, ModelViewSet):
    queryset = Concert.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JwtAuthentication]
    read_serializer_class = ConcertReadSerializer
    write_serializer_class = ConcertWriteSerializer

    def get_queryset(self):
        filters = {}
        from_date = self.request.query_params.get('from')
        to_date = self.request.query_params.get('to')
        status = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        filter_name = self.request.query_params.get('filter')
        if from_date is not None and to_date is not None:
            filters['date__range'] = (from_date, to_date)
        elif from_date is not None:
            filters['date__gte'] = from_date
        elif to_date is not None:
            filters['date__lte'] = to_date
        if status is not None:
            filters['status'] = status
        if category is not None:
            filters['category'] = category
        if filter_name is not None:
            filters['name__icontains'] = filter_name
        return Concert.objects.all().filter(**filters)

class ArtistSessionViewSet(ReadWriteSerializerViewSetMixin, ModelViewSet):
    queryset = ArtistSession.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JwtAuthentication]
    read_serializer_class = ArtistSessionReadSerializer
    write_serializer_class = ArtistSessionWriteSerializer

class SignInView(APIView):
    authentication_classes = []

    @swagger_auto_schema(request_body=sign_in_request_dto, responses={'200': sign_in_response_dto})
    def post(self, request):
        username = request.data['user']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({
                'error': 'Cannot to sign in'
            }, status=403)
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
    authentication_classes = []

    @swagger_auto_schema(request_body=sign_up_request_dto, responses={'200': ExtendedUserSerializer})
    def post(self, request):
        username = request.data['user']
        email = request.data['email']
        role = request.data.get('role', UserRole.VIEWER.value)
        password = request.data['password']
        base_user = User.objects.create_user(username, email, password)
        user = ExtendedUser.objects.create(id=base_user.id, name=username, role=role)
        user_serializer = ExtendedUserSerializer(user)
        return Response(user_serializer.data)

class FileUploadView(APIView):
    authentication_classes = [JwtAuthentication]
    permission_classes = [IsAuthenticated]
    location_type_mapping = {
        'avatar': 'avatars',
        'poster': 'posters',
    }

    @swagger_auto_schema(request_body=upload_link_request_body_dto, responses={'200': upload_link_response_dto})
    def post(self, request):
        client = boto3.client(
            's3',
            endpoint_url=settings.S3_ENDPOINT,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY
        )
        upload_type = request.data.get('upload_type', None)
        if upload_type is None or not upload_type in self.location_type_mapping:
            return Response({ 'error': 'Missing or incorrect upload type' }, status=400)
        filename = '{}/{}.png'.format(self.location_type_mapping[upload_type], str(uuid4()))
        upload_link = client.generate_presigned_url('put_object', dict(Bucket=settings.S3_BUCKET, Key=filename), ExpiresIn=86400)
        parsed_link = urlparse(upload_link)
        return Response({
            'url': settings.S3_PUBLIC_URL + parsed_link.path + '?' + parsed_link.query
        })