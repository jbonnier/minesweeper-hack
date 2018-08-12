from mitmproxy.models import HTTPResponse
from netlib.http import Headers

def request(context, flow):
    if flow.request.url == 'http://demineur.hugames.fr/js/built.js?v2':
        flow.request.host = '127.0.0.1'
        flow.request.path = '/js/cheat.js'