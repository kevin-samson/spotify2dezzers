from flask import Blueprint, render_template, redirect, url_for, session, jsonify
from application.root.forms import MainForm

root = Blueprint('root', __name__)


@root.route('/', methods=['POST', 'GET'])
@root.route('/index', methods=['POST', 'GET'])
def index():
    form = MainForm()
    if form.validate_on_submit():
        print(form.website.data)
        return redirect(url_for('spotify.spotify_tracks', id=form.website.data))

    return render_template('home.html', form=form)


@root.route('/test')
def test():
    if 'token_info' in session and 'dezzer_token' in session:
        return jsonify({'spotify': session['token_info']['access_token'], 'dezzers': session['dezzer_token']})
    return "there is error", 404



