import base64

from flask import request, redirect, session, url_for, Blueprint, jsonify
import requests as r
from config import Config

dezzer = Blueprint('dezzer', __name__)

REDIRECT_URI = Config.DEZZERS_REDIRECT_URI
APP_ID = Config.DEZZERS_APP_ID
SECRET_KEY = Config.DEZZERS_SECRET_KEY
PERMS = Config.DEZZERS_PERMS
DEZZER_API = 'https://api.deezer.com/'


@dezzer.route('/dezzer_login')
def dezzer_login():
    url = f'https://connect.deezer.com/oauth/auth.php?app_id={APP_ID}&redirect_uri={REDIRECT_URI}&perms={PERMS}'
    return redirect(url)


@dezzer.route('/dezzer_callback')
def dezzer_callback():
    CODE = request.args.get('code')
    url = f'https://connect.deezer.com/oauth/access_token.php?app_id={APP_ID}&secret={SECRET_KEY}&code={CODE}'
    return redirect(f'get_details?{r.get(url).text}')


@dezzer.route('/get_details')
def get_details():
    session['dezzer_token'] = request.args.get('access_token')
    return redirect('/index')


@dezzer.route('/create_playlist_and_add_songs')
def create_playlist():
    name = request.args.get('name')
    songs = request.args.get('songs')
    song_list = songs.split(',')
    url = f"{DEZZER_API}/user/me/playlists"
    data = r.post(url, params={'access_token': session['dezzer_token'], 'title': name})
    data = data.json()
    playlist_id = str(data['id'])
    url = f'{DEZZER_API}/playlist/{playlist_id}/tracks'
    for chunk in make_chunks(song_list, 10):
        song_string = ','.join(chunk)
        r.post(url, params={'access_token': session['dezzer_token'],
                            'songs': song_string})
    return redirect('/index')


@dezzer.route('/get_isrc')
def get_isrc():
    name = request.args.get('name')
    songs = request.args.get('songs')
    song_ids = []
    error = []
    songs_list = songs.split(',')
    for isrc in songs_list:
        url = f'{DEZZER_API}track/isrc:{isrc}'
        f = r.get(url, params={'access_token': session['dezzer_token']})
        js = f.json()
        if 'error' in js:
            error.append(isrc)
        else:
            print(js['title'])
            song_ids.append(str(js['id']))
    song_string = ','.join(song_ids)
    return redirect(url_for('dezzer.create_playlist', name=name, songs=song_string))


def make_chunks(data, chunk_size):
    while data:
        chunk, data = data[:chunk_size], data[chunk_size:]
        yield chunk


