from base64 import b64encode

import requests

BASE_URL = 'https://api-m.sandbox.paypal.com'

def generate_access_token(client_id: str, client_secret: str) -> str:
    authorization_header = 'Basic ' + b64encode(f'{client_id}:{client_secret}'.encode('utf-8')).decode('utf-8')
    resp = requests.post(
        f'{BASE_URL}/v1/oauth2/token',
        headers={'Authorization': authorization_header},
        body='grant_Type=client_credentials'
    )
    data = resp.json()
    return data['access_token']

def create_order(token: str, description: str, price: int) -> dict:
    payload = {
        'intent': 'CAPTURE',
        'purchase_units': [
            {
                # 'invoice_id': ??
                # 'custom_id': ??
                'description': description,
                'amount': {
                    'currency_code': 'USD',
                    'value': price
                }
            }
        ]
    }
    resp = requests.post(
        f'{BASE_URL}/v2/checkout/orders',
        headers={'Authorization': f'Bearer {token}'},
        json=payload
    )
    return resp.json()

def capture_order(token: str, order_id: str) -> dict:
    resp = requests.post(
        f'{BASE_URL}/v2/checkout/orders/{order_id}/capture',
        headers={'Authorization': f'Bearer {token}'},
    )
    return resp.json()