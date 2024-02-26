from base64 import b32encode
import contextlib
import random
from uuid import uuid4
from random_data import NAMES, MAIL_DOMAINS, generate_surname

def get_avatar_url(api=None, filename=None):
    if api is None:
        return f'http://s3.test.local/avatars/{uuid4()}.png'
    return api.upload_png('avatar', filename)

def get_poster(api=None, filename=None):
    if api is None:
        return f'http://s3.test.local/posters/{uuid4()}.png'
    return api.upload_png('poster', filename)

@contextlib.contextmanager
def get_user(api, payload):
    name = random.choice(NAMES)
    username = name.lower() + str(random.randint(1, 100))
    password = b32encode(bytes([random.getrandbits(8) for _ in range(5)])).decode('utf-8')
    email = username + '@' + random.choice(MAIL_DOMAINS)
    user_payload = {
        'name': name + ' ' + generate_surname(),
        'username': username,
        'password': password,
        'email': email,
        'role': 'viewer',
        **payload
    }
    user = api.post('/auth/signup', user_payload)
    print(user)
    try:
        yield (user, user_payload['username'], user_payload['password'])
    finally:
        print('TODO: delete user')

@contextlib.contextmanager
def get_concert(api, payload, do_not_delete=False):
    concert = api.post('/concerts/', {
        'name': 'Test show',
        'description': 'Test show description',
        'date': '2032-09-01T06:00:00',
        'slots': 10,
        'poster_url': get_poster(),
        'category': 'classic',
        'user_id': None,
        'performance_time': random.randrange(10, 30),
        'access': 'free',
        **payload
    })
    try:
        yield concert
    finally:
        if do_not_delete is not True:
            api.delete(f'/concerts/{concert["id"]}')

@contextlib.contextmanager
def get_session(api, payload, do_not_delete=False):
    session = api.post('/sessions/', {
        'name': 'Test session',
        'description': 'Test artist session',
        'artist_demo_url': get_poster(),
        'concert': uuid4(),
        **payload
    })
    try:
        yield session
    finally:
        if do_not_delete is not True:
            api.delete(f'/sessions/{session["id"]}')

@contextlib.contextmanager
def get_artist_subscription(api, payload, do_not_delete=False):
    subscription = api.post(f'/artists/{payload["artist"]}/subscribe/', {})
    try:
        yield subscription
    finally:
        if do_not_delete is not True:
            api.post(f'/artists/{payload["artist"]}/unsubscribe/', {})

@contextlib.contextmanager
def get_concert_subscription(api, payload, do_not_delete=False):
    subscription = api.post(f'/concerts/{payload["concert"]}/subscribe/', {})
    try:
        yield subscription
    finally:
        if do_not_delete is not True:
            api.post(f'/concerts/{payload["concert"]}/unsubscribe/', {})

@contextlib.contextmanager
def get_sponsor_ad(api, concert_id, banner_url=None, do_not_delete=False):
    if banner_url is None:
        banner_url = 'https://ads.test.local/banner.png'
    advert = api.post(f'/sponsor-ads/', {
        'user': None,
        'concert': concert_id,
        'banner_url': banner_url
    })
    try:
        yield advert
    finally:
        if do_not_delete is not True:
            api.delete(f'/sponsor-ads/{advert["id"]}/')

@contextlib.contextmanager
def get_ticket(api, concert_id, do_not_delete=False):
    ticket = api.post(f'/tickets/', {
        'user': None,
        'concert': concert_id,
    })
    try:
        yield ticket
    finally:
        if do_not_delete is not True:
            api.delete(f'/tickets/{ticket["id"]}/')