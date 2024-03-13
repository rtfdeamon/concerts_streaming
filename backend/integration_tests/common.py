import typing as t
import jwt
import requests

BASE_URL = 'http://127.0.0.1:8080'

class ApiError(Exception):
    pass

class ApiWrapper():
    def __init__(self, base_url):
        self.base_url = base_url
        self.access_token = None
        self.refresh_token = None
        self.user_id = None

    def authorize(self, login, password):
        data = self.post('/auth/signin', { 'user': login, 'password': password })
        self.access_token = data['access_token']
        self.refresh_token = data['refresh_token']
        payload = jwt.decode(self.access_token, options=dict(verify_signature=False))
        self.user_id = payload['sub']

    def get_headers(self):
        if self.access_token is not None:
            return { 'Authorization': 'Bearer ' + self.access_token }
        else:
            return None
    
    def upload_png(self, type: str, filename: str):
        data = self.post('/upload/generate-link', { 'upload_type': type })
        upload_link = data['url']
        resp = requests.put(upload_link, data=open(filename, 'rb'), headers={'content-type': 'image/png'})
        return upload_link[0:upload_link.find('?')]
    
    def get(self, path: str, query: t.Dict[str, str]=None):
        resp = requests.get(self.base_url + path, params=query, headers=self.get_headers())
        if resp.status_code > 399:
            raise ApiError(resp.text)
        return resp.json()
    
    def post(self, path: str, data: t.Any):
        resp = requests.post(self.base_url + path, json=data, headers=self.get_headers())
        if resp.status_code > 399:
            raise ApiError(resp.text)
        return resp.json()
    
    def put(self, path: str, data: t.Any):
        resp = requests.put(self.base_url + path, json=data, headers=self.get_headers())
        if resp.status_code > 399:
            raise ApiError(resp.text)
        return resp.json()

    def patch(self, path: str, data: t.Any):
        resp = requests.patch(self.base_url + path, json=data, headers=self.get_headers())
        if resp.status_code > 399:
            raise ApiError(resp.text)
        return resp.json()
    
    def delete(self, path: str):
        resp = requests.delete(self.base_url + path, headers=self.get_headers())
        if resp.status_code > 399:
            raise ApiError(resp.text)
        return resp.text