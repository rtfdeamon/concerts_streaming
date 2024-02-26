import datetime
from uuid import uuid4
from urllib.parse import urlparse
import jwt
import boto3
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet, mixins
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView, Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.conf import settings
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema, no_body

from .models import ArtistSession, ArtistSubscription, ConcertSubscription, ConcertTicket, ExtendedUser, Concert, RefreshToken, SponsorAd, UserRole
from .serializers import (
    ConcertAdReadSerializer,
    ConcertAdCreateSerializer,
    ConcertAdUpdateSerializer,
    ArtistSessionReadSerializer,
    ArtistSessionCreateSerializer,
    ArtistSessionUpdateSerializer,
    ArtistSubscriptionSerializer,
    ConcertReadSerializer,
    ConcertSubscriptionSerializer,
    ConcertTicketCreateSerializer,
    ConcertTicketReadSerializer,
    ConcertWriteSerializer,
    ExtendedUserSerializer,
    UserSerializer
)
from .schemas import (
    sign_in_request_dto,
    sign_up_request_dto,
    sign_in_response_dto,
    user_response_dto,
    user_create_request_dto,
    user_update_request_dto,
    concerts_query_parameters,
    upload_link_request_body_dto,
    upload_link_response_dto,
    artists_query_parameters,
    refresh_token_request_dto,
    artists_sessions_query_parameters,
    sponsor_ads_query_parameters,
    status_response_dto,
)
from utils.serializers import ReadWriteSerializerViewSetMixin
from utils.authentication import AuthenticationError, JwtAuthentication, generate_access_token, generate_refresh_token, reissue_refresh_token

class UserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JwtAuthentication]

    def get_filters(self):
        filters = {}
        role = self.request.query_params.get('role')
        filter_name = self.request.query_params.get('filter')
        if role is not None:
            filters['role'] = role
        if filter_name is not None:
            filters['name__icontains'] = filter_name
        return filters

    @swagger_auto_schema(responses={'200': ExtendedUserSerializer(many=True)})
    def list(self, request):
        filters = self.get_filters()
        queryset = ExtendedUser.objects.all().filter(**filters).order_by('name')
        serializer = ExtendedUserSerializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(responses={'200': ExtendedUserSerializer})
    def retrieve(self, request, pk=None):
        queryset = ExtendedUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ExtendedUserSerializer(user)
        return Response(serializer.data)
    
    @swagger_auto_schema(request_body=user_create_request_dto, responses={'200': ExtendedUserSerializer})
    def create(self, request, pk=None):
        username = request.data['username']
        name = request.data['name']
        email = request.data['email']
        role = request.data['role']
        password = request.data['password']
        base_user = User.objects.create_user(username, email, password)
        user = ExtendedUser.objects.create(id=base_user.id, name=name, role=role)
        user_serializer = ExtendedUserSerializer(user)
        return Response(user_serializer.data)
    
    @swagger_auto_schema(request_body=user_update_request_dto, responses={'200': ExtendedUserSerializer})
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
    
    @swagger_auto_schema(method='GET', responses={'200': ExtendedUserSerializer})
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
        sorting_order = self.request.query_params.get('sort', 'name')
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
        return Concert.objects.all().filter(**filters).order_by(sorting_order)
    
    @swagger_auto_schema(
        request_body=no_body,
        responses={'200': ConcertSubscriptionSerializer }
    )
    @action(url_path='subscribe', methods=['POST'], detail=True)
    def subscribe(self, request, pk=None):
        user_id = request.user.id
        subscription = ConcertSubscription.objects.create(user_id=user_id, concert_id=pk)
        return Response(ConcertSubscriptionSerializer(instance=subscription).data)
    
    @swagger_auto_schema(
        request_body=no_body,
        responses={'200': ConcertSubscriptionSerializer }
    )
    @action(url_path='unsubscribe', methods=['POST'], detail=True)
    def unsubscribe(self, request, pk=None):
        user_id = request.user.id
        subscription = ConcertSubscription.objects.filter(user_id=user_id, concert_id=pk).first()
        subscription.delete()
        return Response(ConcertSubscriptionSerializer(instance=subscription).data)

class ArtistSessionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JwtAuthentication]

    def get_serializer_class(self):
        if self.action == 'create':
            return ArtistSessionCreateSerializer
        if self.action in ["update", "partial_update"]:
            return ArtistSessionUpdateSerializer
        return ArtistSessionReadSerializer

    def create(self, request):
        request.data['user'] = request.user.id
        return super().create(request)
    
    def get_queryset(self):
        if self.action == 'list':
            filters = {}
            sorting_order = self.request.query_params.get('sort', 'name')
            concert = self.request.query_params.get('concert', None)
            user = self.request.user

            if concert is not None:
                filters['concert'] = concert
            elif user is not None:
                filters['user'] = user.id
            return ArtistSession.objects.all().filter(**filters).order_by(sorting_order)
        else:
            return ArtistSession.objects.all()

    @swagger_auto_schema(responses={'200': ArtistSessionReadSerializer})
    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        user = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer_class()(instance=user)
        return Response({
            **serializer.data,
            'streaming_server': settings.STREAMING_SERVER_BASE_URL
        })
    
    @swagger_auto_schema(manual_parameters=artists_sessions_query_parameters)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class SponsorAdsViewSet(ReadWriteSerializerViewSetMixin, ModelViewSet):
    authentication_classes = [JwtAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return ConcertAdCreateSerializer
        if self.action in ["update", "partial_update"]:
            return ConcertAdUpdateSerializer
        return ConcertAdReadSerializer

    def create(self, request):
        request.data['user'] = request.user.id
        return super().create(request)

    def get_queryset(self):
        if self.action == 'list':
            filters = {}
            sorting_order = self.request.query_params.get('sort', 'created_at')
            concert = self.request.query_params.get('concert', None)
            status = self.request.query_params.get('status', None)
            select = self.request.query_params.get('select', None)
            user = self.request.user

            if concert is not None:
                filters['concert'] = concert
            elif user is not None and select != 'all':
                filters['user'] = user.id
            if status is not None:
                filters['status'] = status
            return SponsorAd.objects.all().filter(**filters).order_by(sorting_order)
        else:
            return SponsorAd.objects.all()

    @swagger_auto_schema(manual_parameters=sponsor_ads_query_parameters)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class ConcertTicketsViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, GenericViewSet):
    authentication_classes = [JwtAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ConcertTicket.objects.all().filter(user_id=self.request.user.id)

    def get_serializer_class(self):
        if self.action == 'create':
            return ConcertTicketCreateSerializer
        return ConcertTicketReadSerializer
    
    def create(self, request):
        request.data['user'] = request.user.id
        return super().create(request)

class ArtistsViewSet(ViewSet):
    authentication_classes = [JwtAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(manual_parameters=artists_query_parameters, responses={'200': ExtendedUserSerializer(many=True)})
    def list(self, request):
        filter_by_name = request.query_params.get('filter', None)
        filters = {
            'role': UserRole.ARTIST.value
        }
        if filter_by_name is not None:
            filters['name__icontains'] = filter_by_name
        filter_name = self.request.query_params.get('filter')
        sorting_order = self.request.query_params.get('sort', 'name')
        if filter_name is not None:
            filters['name__icontains'] = filter_name
        queryset = ExtendedUser.objects.all().filter(**filters).order_by(sorting_order)
        serializer = ExtendedUserSerializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(manual_parameters=artists_query_parameters, responses={'200': ExtendedUserSerializer})
    def retrieve(self, request, pk=None):
        queryset = ExtendedUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ExtendedUserSerializer(instance=user)
        return Response(serializer.data)
    
    @action(url_path='trending', methods=['GET'], detail=False)
    def trending(self, request):
        queryset = ExtendedUser.objects.all().filter(role=UserRole.ARTIST.value).order_by('?')[:9]
        serializer = ExtendedUserSerializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=no_body, responses={'200': ArtistSubscriptionSerializer})
    @action(url_path='subscribe', methods=['POST'], detail=True)
    def subscribe(self, request, pk=None):
        user_id = request.user.id
        subscription = ArtistSubscription.objects.create(user_id=user_id, artist_id=pk)
        return Response(ArtistSubscriptionSerializer(instance=subscription).data)

    @swagger_auto_schema(request_body=no_body, responses={'200': ArtistSubscriptionSerializer})
    @action(url_path='unsubscribe', methods=['POST'], detail=True)
    def unsubscribe(self, request, pk=None):
        user_id = request.user.id
        subscription = ArtistSubscription.objects.filter(user_id=user_id, artist_id=pk).first()
        subscription.delete()
        return Response(ArtistSubscriptionSerializer(instance=subscription).data)

class SignInView(APIView):
    authentication_classes = []

    @swagger_auto_schema(request_body=sign_in_request_dto, responses={'200': sign_in_response_dto})
    def post(self, request):
        username = request.data['user']
        password = request.data['password']
        try:
            user = authenticate(username=username, password=password)
            if user is None:
                return Response({
                    'error': 'Cannot to sign in'
                }, status=403)
            now = datetime.datetime.utcnow()
            session_id = uuid4()
            access_token = generate_access_token(
                user.id,
                session_id,
                now
            )
            refresh_token = generate_refresh_token(
                user.id,
                session_id,
                int(now.timestamp() + settings.REFRESH_TOKEN_LIFETIME)
            )
            return Response({
                'access_token': access_token,
                'refresh_token': refresh_token,
            })
        except Exception as e:
            return Response({
                'error': str(e)
            }, 403)

class RefreshTokenView(APIView):
    authentication_classes = []

    @swagger_auto_schema(request_body=refresh_token_request_dto, responses={'200': sign_in_response_dto})
    def post(self, request):
        try:
            refresh_token = request.data['token']
            now = datetime.datetime.utcnow()
            user_id, session_id, new_token = reissue_refresh_token(refresh_token, int(now.timestamp()))
            access_token = generate_access_token(
                user_id,
                session_id,
                now
            )
            return Response({
                'access_token': access_token,
                'refresh_token': new_token,
            })
        except AuthenticationError as e:
            return Response({
                'error': str(e)
            }, 403)

class SignUpView(APIView):
    authentication_classes = []

    @swagger_auto_schema(request_body=sign_up_request_dto, responses={'200': ExtendedUserSerializer})
    def post(self, request):
        username = request.data['username']
        name = request.data['name']
        email = request.data['email']
        role = request.data.get('role', UserRole.VIEWER.value)
        password = request.data['password']
        try:
            base_user = User.objects.create_user(username, email, password)
            user = ExtendedUser.objects.create(id=base_user.id, name=name, role=role)
            user_serializer = ExtendedUserSerializer(user)
            return Response(user_serializer.data)
        except Exception as e:
            return Response({
                'error': str(e)
            }, 403)

class SignOutView(APIView):
    authentication_classes = [JwtAuthentication]

    @swagger_auto_schema(request_body=no_body, responses={'200': status_response_dto})
    def post(self, request):
        session_id = request.auth
        session = RefreshToken.objects.filter(session_id=session_id)
        session.delete()
        return Response({ 'success': True })


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
        upload_link = client.generate_presigned_url('put_object', dict(Bucket=settings.S3_BUCKET, Key=filename, ContentType='image/png'), ExpiresIn=86400)
        parsed_link = urlparse(upload_link)
        return Response({
            'url': settings.S3_PUBLIC_URL + parsed_link.path + '?' + parsed_link.query
        })