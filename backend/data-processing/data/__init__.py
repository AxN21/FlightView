from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

# Initialize database instance
db = SQLAlchemy()

def create_app():
    '''
    Create and configure the Flask application

    Returns:
        app (Flask): The configured Flask application

    '''
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.init_app(app)

    # import and register blueprints
    from .routes.parser import parser_blueprint
    #from .routes.analysis import analysis_blueprint

    app.register_blueprint(parser_blueprint, url_prefix='/data')
    #app.register_blueprint(analysis_blueprint)
    
    with app.app_context():
        db.create_all()
    
    return app