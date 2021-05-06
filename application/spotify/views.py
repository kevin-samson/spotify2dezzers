import time
from config import Config
import spotipy
import spotipy.exceptions
from flask import redirect, session, request, Blueprint, jsonify, url_for

spotify = Blueprint('spotify', __name__)

sp_oauth = spotipy.oauth2.SpotifyOAuth(client_id=Config.SPOTIFY_CLIENT_ID, client_secret=Config.SPOTIFY_CLIENT_SECRET,
                                       redirect_uri=Config.SPOTIFY_REDIRECT_URI,
                                       scope=Config.SPOTIFY_SCOPE)


@spotify.route("/spotify_login")
def spotify_login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)


@spotify.route("/api_callback")
def api_callback():
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code, check_cache=False)

    session["token_info"] = token_info

    return redirect("/index")


@spotify.route('/spotify_tracks')
def spotify_tracks():
    playlist_id = request.args.get('id')
    session['token_info'], authorized = get_token(session)
    session.modified = True
    if not authorized:
        return redirect('/index')
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
    offset = 0
    tracks = []
    while True:
        content = sp.playlist_items(playlist_id, fields=None, limit=100, offset=offset, market=None)
        tracks += content['items']

        if content['next'] is not None:
            offset += 100
        else:
            break
    track_isrc = []
    for track in tracks:
        track_isrc.append(track['track']['external_ids']['isrc'])
    my_string = ','.join(track_isrc)
    playlist_name = sp.playlist(playlist_id, fields='name')['name']

    return redirect(url_for('dezzer.get_isrc', name=playlist_name, songs=my_string))


def get_token(session):
    token_valid = False
    token_info = session.get("token_info", {})

    # Checking if the session already has a token stored
    if not (session.get('token_info', False)):
        token_valid = False
        return token_info, token_valid

    # Checking if token has expired
    now = int(time.time())
    is_token_expired = session.get('token_info').get('expires_at') - now < 60

    # Refreshing token if it has expired
    if is_token_expired:
        token_info = sp_oauth.refresh_access_token(session.get('token_info').get('refresh_token'))

    token_valid = True
    return token_info, token_valid
