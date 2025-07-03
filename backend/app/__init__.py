from flask import Flask, jsonify
from flask_cors import CORS
from .core.config import Config
from .core.extensions import db, jwt, migrate, ma

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])  # Allow credentials and only from frontend

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    # Register blueprints from features
    from .features.user.routes import auth_bp
    from .features.question.routes import questions_bp, refresh_trie
    from .features.question.recommendations import recommendations_bp
    from .features.submission.routes import submissions_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(questions_bp, url_prefix='/api/questions')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')
    app.register_blueprint(submissions_bp, url_prefix='/api/submissions')

    # Refresh the Trie after app and DB are ready
    with app.app_context():
        refresh_trie()

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal server error'}), 500

    return app 