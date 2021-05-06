from dotenv import load_dotenv
from pathlib import Path  # python3 only
import os

# set path to env file
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


class Config:
    """Set Flask configuration vars from .env file."""

    # Load in enviornemnt variables
    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
    SECRET_KEY = os.getenv('SECRET_KEY')
    SERVER = os.getenv('SERVER')
    SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
    SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
    SPOTIFY_REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI')
    SPOTIFY_SCOPE = os.getenv('SPOTIFY_SCOPE')
    DEZZERS_REDIRECT_URI = os.getenv("DEZZERS_REDIRECT_URI")
    DEZZERS_APP_ID = os.getenv("DEZZERS_APP_ID")
    DEZZERS_SECRET_KEY = os.getenv("DEZZERS_SECRET_KEY")
    DEZZERS_PERMS = os.getenv("DEZZERS_PERMS")