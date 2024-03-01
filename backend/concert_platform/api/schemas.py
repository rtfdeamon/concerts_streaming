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
        'username': Schema(type=TYPE_STRING),
        'password': Schema(type=TYPE_STRING),
        'email': Schema(type=TYPE_STRING),
        'name': Schema(type=TYPE_STRING),
        'role': Schema(type=TYPE_STRING, enum=['administrator', 'artist', 'viewer'])
    }
)

nested_user_dto = Schema(
    type='object',
    properties={
        'id': Schema(type=TYPE_INTEGER),
        'role': Schema(type=TYPE_STRING),
        'name': Schema(type=TYPE_STRING),
        'artist_genre': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
        'avatar_url': Schema(type=TYPE_STRING),
        'username': Schema(type=TYPE_STRING),
    }
)

user_response_dto = Schema(
    type='object',
    properties={
        'id': Schema(type=TYPE_INTEGER),
        'role': Schema(type=TYPE_STRING),
        'name': Schema(type=TYPE_STRING),
        'artist_genre': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
        'avatar_url': Schema(type=TYPE_STRING),
        'username': Schema(type=TYPE_STRING),
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
        'username': Schema(type=TYPE_STRING),
        'name': Schema(type=TYPE_STRING),
        'email': Schema(type=TYPE_STRING),
        'password': Schema(type=TYPE_STRING),
        'role': Schema(type=TYPE_STRING),
        'avatar_url': Schema(type=TYPE_STRING),
        'artist_genre': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
    }
)

user_update_request_dto = Schema(
    type='object', properties={
        'name': Schema(type=TYPE_STRING),
        'email': Schema(type=TYPE_STRING),
        'role': Schema(type=TYPE_STRING),
        'avatar_url': Schema(type=TYPE_STRING),
        'artist_genre': Schema(type=TYPE_STRING),
        'description': Schema(type=TYPE_STRING),
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
    Parameter('category', IN_QUERY, type=TYPE_STRING),
]

users_query_parameters = [
    Parameter('role', IN_QUERY, type=TYPE_STRING, enum=[name for name, _ in UserRole.choices]),
    Parameter('filter', IN_QUERY, type=TYPE_STRING),
]

artists_sessions_query_parameters = [
    Parameter('concert', IN_QUERY, type=TYPE_STRING),
    Parameter('select', IN_QUERY, type=TYPE_STRING, enum=['user', 'all']),
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
        'upload_type': Schema(type=TYPE_STRING, enum=['avatar', 'poster', 'artist_demo']),
        'content_type': Schema(type=TYPE_STRING),
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

mail_subscription_request_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'email': Schema(type=TYPE_STRING)
    }
)

chat_send_request_dto = Schema(
    type=TYPE_OBJECT,
    properties={
        'message': Schema(type=TYPE_STRING)
    }
)
chat_history_query_parameters = [
    Parameter('last_messages', IN_QUERY, type=TYPE_INTEGER),
]
