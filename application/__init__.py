from flask import Flask


def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    from application.spotify.views import spotify
    from application.dezzer.views import dezzer
    from application.root.views import root

    app.register_blueprint(dezzer)
    app.register_blueprint(root)
    app.register_blueprint(spotify)
    return app
