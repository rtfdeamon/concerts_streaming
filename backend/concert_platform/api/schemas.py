from drf_yasg.openapi import (
    Schema,
    SchemaRef,
    Parameter,
    IN_QUERY,
    IN_PATH,
    TYPE_OBJECT,
    TYPE_STRING,
    TYPE_ARRAY,
    TYPE_INTEGER,
    TYPE_BOOLEAN,
)

from .models import ArtistSessionStatus, ConcertStatus, UserRole, ConcertAdStatus

status_response_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'success': Schema(type=TYPE_BOOLEAN)
    }
)

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
        'username': Schema(type='string'),
        'password': Schema(type='string'),
        'email': Schema(type='string'),
        'name': Schema(type='string'),
        'role': Schema(type='string', enum=['administrator', 'artist', 'viewer'])
    }
)

nested_user_dto = Schema(
    type='object',
    properties={
        'id': Schema(type='integer'),
        'role': Schema(type='string'),
        'name': Schema(type='string'),
        'artist_genre': Schema(type='string'),
        'avatar_url': Schema(type='string'),
        'username': Schema(type='string'),
    }
)

user_response_dto = Schema(
    type='object',
    properties={
        'id': Schema(type='integer'),
        'role': Schema(type='string'),
        'name': Schema(type='string'),
        'artist_genre': Schema(type='string'),
        'avatar_url': Schema(type='string'),
        'username': Schema(type='string'),
        'followers': Schema(
            type=TYPE_ARRAY,
            items=nested_user_dto
        ),
        'artist_followed': Schema(
            type=TYPE_ARRAY,
            items=nested_user_dto,
        ),
        'concerts_followed': Schema(
            type=TYPE_ARRAY,
            items={
                '$ref': '#/definitions/ConcertRead'
            }
        ),
        'performances': Schema(
            type=TYPE_ARRAY,
            items={ '$ref': '#/definitions/ArtistSessionRead' }
        ),
        'ads': Schema(
            type=TYPE_ARRAY,
            items={ '$ref': '#/definitions/ConcertAdRead' }
        ),
        'tickets': Schema(
            type=TYPE_ARRAY,
            items={ '$ref': '#/definitions/ConcertTicketRead' }
        ),
        'concerts': Schema(
            type=TYPE_ARRAY,
            items={ '$ref': '#/definitions/ConcertRead' }
        )
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
        'artist_genre': Schema(type='string'),
    }
)

user_update_request_dto = Schema(
    type='object', properties={
        'name': Schema(type='string'),
        'email': Schema(type='string'),
        'role': Schema(type='string'),
        'avatar_url': Schema(type='string'),
        'artist_genre': Schema(type='string'),
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

users_query_parameters = [
    Parameter('role', IN_QUERY, type=TYPE_STRING, enum=[name for name, _ in UserRole.choices]),
    Parameter('filter', IN_QUERY, type=TYPE_STRING),
]

artists_sessions_query_parameters = [
    Parameter('concert', IN_QUERY, type=TYPE_STRING)
]

sponsor_ads_query_parameters = [
    Parameter('concert', IN_QUERY, type=TYPE_STRING),
    Parameter('status', IN_QUERY, type=TYPE_STRING, enum=[name for name, _ in ConcertAdStatus.choices]),
    Parameter('select', IN_QUERY, type=TYPE_STRING, enum=['user', 'all']),
]

artist_sessions_request_dto = Schema(
    type=TYPE_OBJECT, properties={
        'name': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
        'artist_demo_url': Schema(type=TYPE_STRING),
        'concert_id': Schema(type=TYPE_STRING)
    }
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