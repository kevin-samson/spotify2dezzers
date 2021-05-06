from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField


class MainForm(FlaskForm):
    website = StringField('Spotify id')
    submit = SubmitField('Submit')


