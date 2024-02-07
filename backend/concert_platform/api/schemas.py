from drf_yasg import openapi

from .serializers import UserSerializer

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
        'email': openapi.Schema(type='string'),
        'role': openapi.Schema(type='string', enum=['administrator', 'artist', 'viewer'])
    }
)

user_response_dto = openapi.Schema(
    type='object',
    properties={
        'id': openapi.Schema(type='integer'),
        'role': openapi.Schema(type='string'),
        'user': openapi.Schema(type='object', properties={
            'id': openapi.Schema(type='string'),
            'username': openapi.Schema(type='string'),
            'email': openapi.Schema(type='string'),
        })
    }
)

user_list_response_dto = openapi.Schema(
    type='array', items=user_response_dto
)

user_create_request_dto = openapi.Schema(
    type='object', properties={
        'user': openapi.Schema(type='string'),
        'email': openapi.Schema(type='string'),
        'password': openapi.Schema(type='string'),
        'role': openapi.Schema(type='string'),
        'avatar_url': openapi.Schema(type='string'),
    }
)

user_update_request_dto = openapi.Schema(
    type='object', properties={
        'user': openapi.Schema(type='string'),
        'email': openapi.Schema(type='string'),
        'role': openapi.Schema(type='string'),
        'avatar_url': openapi.Schema(type='string'),
    }
)

concerts_query_parameters = [
    openapi.Parameter('from', openapi.IN_QUERY, type=openapi.TYPE_STRING),
    openapi.Parameter('to', openapi.IN_QUERY, type=openapi.TYPE_STRING),
    openapi.Parameter('status', openapi.IN_QUERY, type=openapi.TYPE_STRING),
    openapi.Parameter('category', openapi.IN_QUERY, type=openapi.TYPE_STRING),
    openapi.Parameter('filter', openapi.IN_QUERY, type=openapi.TYPE_STRING),
]

upload_link_request_body_dto = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'upload_type': openapi.Schema(type=openapi.TYPE_STRING, enum=['avatar', 'poster'])
    }
)

upload_link_response_dto = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'link': openapi.Schema(type=openapi.TYPE_STRING)
    }
)