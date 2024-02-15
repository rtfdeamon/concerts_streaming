from base64 import b64encode
import datetime
from random import getrandbits
import struct
from rest_framework.authentication import SessionAuthentication, BaseAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.conf import settings
import jwt
from api.models import RefreshToken

def generate_refresh_token(user_id: str, expire_at: int):
    refresh_token = b64encode(struct.pack('!6Q', *[getrandbits(64) for _ in range(6)])).decode('utf-8')
    RefreshToken.objects.create(token=refresh_token, user_id=user_id, expire_at=expire_at)
    return refresh_token

def reissue_refresh_token(token: str, now: int) -> "tuple[int, str]":
    rt = RefreshToken.objects.filter(token=token).first()
    if rt is None:
        raise AuthenticationError('Invalid refresh token')
    if rt.expire_at < now:
        raise AuthenticationError('Expired refresh token')
    user_id = rt.user_id
    rt.delete()
    new_token = generate_refresh_token(user_id, now + settings.REFRESH_TOKEN_LIFETIME)
    return user_id, new_token

class AuthenticationError(Exception):
    pass

class NoCsrfSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return

class JwtAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if not auth or auth[0].lower() != b'bearer':
            return None
        if len(auth) == 1:
            msg = _('Invalid basic header. No credentials provided.')
            raise AuthenticationFailed(msg)
        try:
            payload = jwt.decode(auth[1], key=settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['sub'])
            return (user, None)
        except User.DoesNotExist as e:
            raise AuthenticationFailed('Unknown user')
        except jwt.DecodeError as e:
            raise AuthenticationFailed('JWT error: ' + str(e))