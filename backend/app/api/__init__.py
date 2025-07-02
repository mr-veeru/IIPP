from .auth import auth_bp
from .questions import questions_bp
from .submissions import submissions_bp
from .recommendations import recommendations_bp
from .explanations import explanations_bp
from .analytics import analytics_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(questions_bp, url_prefix='/api/questions')
    app.register_blueprint(submissions_bp, url_prefix='/api/submissions')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')
    app.register_blueprint(explanations_bp, url_prefix='/api/explanations')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics') 