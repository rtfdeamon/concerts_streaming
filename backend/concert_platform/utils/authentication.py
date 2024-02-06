from rest_framework.authentication import SessionAuthentication, BaseAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from django.conf import settings
import jwt

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