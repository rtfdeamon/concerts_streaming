from drf_yasg.openapi import (
    Schema,
    Parameter,
    IN_QUERY,
    TYPE_OBJECT,
    TYPE_STRING,
    TYPE_ARRAY,
    TYPE_INTEGER
)

from .models import ArtistSessionStatus, ConcertStatus

from .serializers import UserSerializer

sign_in_request_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'user': Schema(type=TYPE_STRING),
        'password': Schema(type=TYPE_STRING)
    }
)
sign_in_response_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'access_token': Schema(type=TYPE_STRING),
        'refresh_token': Schema(type=TYPE_STRING)
    }
)
sign_up_request_dto = Schema(
    type='object',
    properties={
        'user': Schema(type='string'),
        'password': Schema(type='string'),
        'email': Schema(type='string'),
        'name': Schema(type='string'),
        'role': Schema(type='string', enum=['administrator', 'artist', 'viewer'])
    }
)

user_response_dto = Schema(
    type='object',
    properties={
        'id': Schema(type='integer'),
        'role': Schema(type='string'),
        'name': Schema(type='string'),
        'avatar_url': Schema(type='string'),
        'username': Schema(type='string'),
    }
)

user_list_response_dto = Schema(
    type='array', items=user_response_dto
)

user_create_request_dto = Schema(
    type='object', properties={
        'username': Schema(type='string'),
        'name': Schema(type='string'),
        'email': Schema(type='string'),
        'password': Schema(type='string'),
        'role': Schema(type='string'),
        'avatar_url': Schema(type='string'),
    }
)

user_update_request_dto = Schema(
    type='object', properties={
        'name': Schema(type='string'),
        'email': Schema(type='string'),
        'role': Schema(type='string'),
        'avatar_url': Schema(type='string'),
    }
)

concerts_query_parameters = [
    Parameter('from', IN_QUERY, type=TYPE_STRING),
    Parameter('to', IN_QUERY, type=TYPE_STRING),
    Parameter('status', IN_QUERY, type=TYPE_STRING),
    Parameter('category', IN_QUERY, type=TYPE_STRING),
    Parameter('filter', IN_QUERY, type=TYPE_STRING),
]

artists_query_parameters = [
    Parameter('filter', IN_QUERY, type=TYPE_STRING),
]

concert_response_dto = Schema(
    type=TYPE_OBJECT, properties={
        'id': Schema(type=TYPE_STRING),
        'name': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
        'created_at': Schema(type=TYPE_STRING),
        'date': Schema(type=TYPE_STRING),
        'slots': Schema(type=TYPE_INTEGER),
        'poster_url': Schema(type=TYPE_STRING),
        'status': Schema(
            type=TYPE_STRING,
            enum=[value for value, _ in ConcertStatus.choices]
        ),
        'category': Schema(type=TYPE_STRING),

        'user_id': user_response_dto,
    }
)

artist_sessions_request_dto = Schema(
    type=TYPE_OBJECT, properties={
        'name': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
        'artist_demo_url': Schema(type=TYPE_STRING),
        'concert': concert_response_dto
    }
)

artist_sessions_response_dto = Schema(
    type=TYPE_OBJECT, properties={
        'id': Schema(type=TYPE_STRING),
        'name': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
        'created_at': Schema(type=TYPE_STRING),
        'status': Schema(type=TYPE_STRING, enum=[
            value for value, _ in ArtistSessionStatus.choices
        ]),
        'stream_key': Schema(type=TYPE_STRING),
        'artist_demo_url': Schema(type=TYPE_STRING),
        'streaming_server': Schema(type=TYPE_STRING),
        'concert': concert_response_dto,
        'user': user_response_dto
    }
)
artist_sessions_list_response_dto = Schema(
    type='array', items=artist_sessions_response_dto
)

upload_link_request_body_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'upload_type': Schema(type=TYPE_STRING, enum=['avatar', 'poster'])
    }
)

upload_link_response_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'link': Schema(type=TYPE_STRING)
    }
)

refresh_token_request_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'token': Schema(type=TYPE_STRING)
    }
)