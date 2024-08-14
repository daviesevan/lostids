from flask import Flask
from config import ApplicationConfiguration
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.models import db, bcrypt
from authlib.integrations.flask_client import OAuth

jwt = JWTManager()
oauth = OAuth()

def create_app():
    # Initialize the app 
    app = Flask(__name__)
    app.config.from_object(ApplicationConfiguration)
    jwt.init_app(app)
    db.init_app(app)
    oauth.init_app(app)
    bcrypt.init_app(app)
    CORS(app, support_credentials=True)
    
    # Set up the application context
    app.app_context().push()

    # Import blueprints 
    from app.authentications.routes import authentication_bp


    # Register blueprints 
    app.register_blueprint(authentication_bp)


    with app.app_context():
        db.create_all()

    return app