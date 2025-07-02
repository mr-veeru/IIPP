from flask import Flask, jsonify
from flask_cors import CORS
from .config import Config
from .extensions import db, jwt, migrate, ma

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])  # Allow credentials and only from frontend

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    from .api import register_blueprints
    register_blueprints(app)

    # Refresh the Trie after app and DB are ready
    with app.app_context():
        from .api.questions import refresh_trie
        refresh_trie()

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal server error'}), 500

    return app 