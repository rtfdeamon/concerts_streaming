from base64 import b32encode
import random
from fixtures import (
    get_artist_subscription,
    get_avatar_url,
    get_concert,
    get_concert_subscription,
    get_poster,
    get_session,
    get_ticket,
    get_user,
    get_sponsor_ad,
)
from random_data import NAMES, MAIL_DOMAINS, generate_surname
from common import ApiWrapper, BASE_URL

def authorize_api(api: ApiWrapper):
    name = random.choice(NAMES)
    username = name.lower() + str(random.randint(1, 100))
    password = b32encode(bytes([random.getrandbits(8) for _ in range(5)])).decode('utf-8')
    api.post('/auth/signup', dict(
        username=username,
        password=password,
        email=username + '@' + random.choice(MAIL_DOMAINS),
        name=name + ' ' + generate_surname(),
        role='administrator'
    ))
    api.authorize(username, password)

if __name__ == '__main__':
    api = ApiWrapper(BASE_URL)

    authorize_api(api)

    avatar_url = get_avatar_url()

    api.put('/users/current/', dict(
        avatar_url=avatar_url,
        description='User description',
    ))

    poster_url = get_poster()
    new_poster_url = get_poster()
    big_poster_url = get_poster()
    new_big_poster_url = get_poster()

    show1_payload = {
        'name': 'Show One',
        'poster_url': poster_url,
        'category': 'classic',
        'date': '2032-09-01T06:00:00'
    }
    show2_payload = {
        'name': 'Show Two',
        'poster_url': big_poster_url,
        'category': 'modern',
        'date': '2030-09-01T12:00:00'
    }

    # Test concert update
    with get_concert(api, show1_payload) as show1, get_concert(api, show2_payload) as show2:
        api.patch(f'/concerts/{show1["id"]}/', {
            'poster_url': new_poster_url
        })
        updated_concert = api.get(f'/concerts/{show1["id"]}/')
        assert updated_concert['poster_url'] != show1['poster_url']
        assert updated_concert['poster_url'] == new_poster_url
        assert show1['poster_url'] == poster_url

        classic_concerts = api.get('/concerts/', { 'category': 'classic' })
        assert show1['id'] in (c['id'] for c in classic_concerts)
        assert show2['id'] not in (c['id'] for c in classic_concerts)

        concerts_before_2031 = api.get('/concerts/', { 'to': '2031-01-01' })
        assert show2['id'] in (c['id'] for c in concerts_before_2031)
        assert show1['id'] not in (c['id'] for c in concerts_before_2031)

        concerts_after_2031 = api.get('/concerts/', { 'from': '2031-01-01' })
        assert show2['id'] not in (c['id'] for c in concerts_after_2031)
        assert show1['id'] in (c['id'] for c in concerts_after_2031)

        filtered_concerts = api.get('/concerts/', { 'filter': 'one' })
        assert show2['id'] not in (c['id'] for c in filtered_concerts)
        assert show1['id'] in (c['id'] for c in filtered_concerts)

        sorted_by_date_concerts = api.get('/concerts/', { 'sort': 'date' })
        concert_ids = [item['id'] for item in sorted_by_date_concerts]
        assert concert_ids.index(show1['id']) > concert_ids.index(show2['id'])

        sorted_by_name_concerts = api.get('/concerts/', { 'sort': 'name' })
        concert_ids = [item['id'] for item in sorted_by_name_concerts]
        assert concert_ids.index(show1['id']) < concert_ids.index(show2['id'])

    viewer_api = ApiWrapper(BASE_URL)
    authorize_api(viewer_api)

    # Test artist subscription
    with get_artist_subscription(viewer_api, { 'artist': api.user_id }, do_not_delete=False) as sub:
        viewer_user = viewer_api.get('/users/current/')
        artists_followed_by_viewer = set([item['id'] for item in viewer_user['artists_followed']])
        assert api.user_id in artists_followed_by_viewer

        artist_user = api.get('/users/current/')
        artist_user_followers = set([item['id'] for item in artist_user['followers']])
        assert viewer_api.user_id in artist_user_followers

    # Test concert subscription
    with get_concert(api, {}) as show1:
        with get_concert_subscription(api, { 'concert': show1['id'] }) as subscription:
            user = api.get('/users/current/')
            followed_concerts = set(map(lambda x: x['id'], user['concerts_followed']))
            assert show1['id'] in followed_concerts

            show = api.get(f'/concerts/{show1["id"]}')
            concert_subscribers = set(map(lambda x: x['id'], show['subscribers']))
            assert api.user_id in concert_subscribers

    # Test artist sessions
    with get_user(api, dict(role='artist')) as (u1, *credentials):
        user_profile = api.get(f'/artists/{u1["id"]}/')
        assert user_profile['id'] == u1['id']
        user_api = ApiWrapper(BASE_URL)
        user_api.authorize(*credentials)
        with get_concert(api, {}) as show:
            result = api.get(f'/concerts/{show["id"]}')
            assert result['user_id']['id'] == api.user_id
            with get_session(user_api, { "concert": show['id'] }) as session:
                result = user_api.get(f'/sessions/{session["id"]}/')
                assert show['id'] == result['concert']['id']
                assert user_api.user_id == result['user']['id']

                result = api.get(f'/sessions/?concert={show["id"]}')
                assert session['id'] in set(map(lambda x: x['id'], result))

                result = api.get(f'/concerts/{show["id"]}')
                assert user_api.user_id not in set(map(lambda x: x['id'], result['artists']))

                result = user_api.get('/users/current/')
                assert show["id"] not in set(map(lambda x: x['id'], result['concerts']))

                result = api.patch(f'/sessions/{session["id"]}/', {
                    'status': 'accepted'
                })

                result = api.get(f'/concerts/{show["id"]}')
                assert user_api.user_id in set(map(lambda x: x['id'], result['artists']))

                result = user_api.get('/users/current/')
                assert show["id"] in set(map(lambda x: x['id'], result['concerts']))

                assert result

    # Test sponsor ads
    with get_concert(api, {}, do_not_delete=True) as show:
        with get_sponsor_ad(api, show['id'], do_not_delete=True) as advert:
            result = api.get(f'/sponsor-ads/{advert["id"]}')
            assert result["id"] == advert["id"]
            assert result["concert"]["id"] == show["id"]

            result = api.get(f'/concerts/{show["id"]}')
            assert advert['id'] in set(map(lambda x: x['id'], result["ads"]))

            result = api.get(f'/users/current/')
            assert advert['id'] in set(map(lambda x: x['id'], result["ads"]))

    another_user = ApiWrapper(BASE_URL)
    with get_user(api, {}) as (u2, *credentials):
        another_user.authorize(*credentials)
        with get_concert(api, {}, do_not_delete=True) as show:
            with get_ticket(api, show['id']) as t1, get_ticket(another_user, show['id']) as t2:
                result = another_user.get(f'/concerts/{show["id"]}/')
                print(result)
                order_resp = api.post('/orders/', {'ticket_id': t2['id']})
                order_capture_resp = api.post('/orders/capture/', {'order_id': order_resp['id']})
                print(order_capture_resp)