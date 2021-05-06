from flask import Blueprint, render_template, redirect, url_for, session, jsonify
from application.root.forms import MainForm

root = Blueprint('root', __name__)


@root.route('/', defaults={'path': ''})
@root.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


@root.route('/test')
def test():
    if 'token_info' in session and 'dezzer_token' in session:
        return jsonify({'spotify': session['token_info']['access_token'], 'dezzers': session['dezzer_token']})
    return "there is error", 404


@root.route('/spotify_token')
def spotify_token():
    if 'token_info' in session:
        return jsonify({'spotify': session['token_info']['access_token']})
    return "there is error", 404


@root.route('/dezzer_token')
def dezzer_token():
    if 'dezzer_token' in session:
        return jsonify({'dezzers': session['dezzer_token']})
    return "there is error", 404


@root.route('/home', methods=['POST', 'GET'])
def home():
    return render_template('index.html')


@root.route('/login')
def login():
    form = MainForm()
    if form.validate_on_submit():
        print(form.website.data)
        return redirect(url_for('spotify.spotify_tracks', id=form.website.data))
    return render_template('home.html', form=form)
